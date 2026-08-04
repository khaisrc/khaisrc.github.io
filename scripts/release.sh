#!/bin/sh
set -eu

# Create a release tag in the format vYYYY.MM.DD.<build number>, bump
# package.json to match, push everything, and create a GitHub release
# (which triggers the build & deploy workflow).
#
# The build number is the count of existing tags for today's date (starting
# at 0), unless an explicit version is provided.
#
# Usage:
#   scripts/release.sh [OPTIONS]
#
# Options:
#   --sha <commit>       Commit to tag (default: HEAD). The script bumps
#                        package.json on the current branch tip and tags the
#                        resulting bump commit.
#   --version <version>  Use this version instead of generating one.
#   --no-bump            Do not update package.json or create a bump commit.
#   --no-release         Push the tag but do not create a GitHub release.
#   --release-only [tag] Skip tagging entirely; create a GitHub release for an
#                        existing tag (default: most recent tag).
#   --dry-run            Print the tag without doing anything.
#   -h, --help           Show this help.

usage() {
  sed -n '4,24p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

SHA=""
VERSION=""
RELEASE_TAG=""
BUMP=1
CREATE_RELEASE=1
RELEASE_ONLY=0
DRY_RUN=0

while [ $# -gt 0 ]; do
  case "$1" in
    --sha)
      SHA="$2"
      shift 2
      ;;
    --version)
      VERSION="$2"
      shift 2
      ;;
    --no-bump)
      BUMP=0
      shift
      ;;
    --no-release)
      CREATE_RELEASE=0
      shift
      ;;
    --release-only)
      RELEASE_ONLY=1
      # Optional positional tag argument.
      if [ $# -ge 2 ] && [ "${2#--}" = "$2" ]; then
        RELEASE_TAG="$2"
        shift 2
      else
        shift
      fi
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      ;;
  esac
done

if [ "$RELEASE_ONLY" -eq 1 ] && [ "$CREATE_RELEASE" -eq 0 ]; then
  echo "Error: --release-only and --no-release are contradictory." >&2
  exit 1
fi

# Ensure we have the latest tags from origin.
git fetch --tags origin

if [ "$RELEASE_ONLY" -eq 1 ]; then
  # Resolve which tag to release: explicit argument or the most recent tag.
  if [ -z "$RELEASE_TAG" ]; then
    RELEASE_TAG=$(git tag --sort=-version:refname | head -n 1)
  fi
  if [ -z "$RELEASE_TAG" ]; then
    echo "Error: no tags found to release." >&2
    exit 1
  fi
  if ! git rev-parse -q --verify "refs/tags/$RELEASE_TAG" >/dev/null; then
    echo "Error: tag not found locally: $RELEASE_TAG" >&2
    exit 1
  fi
  if [ "$DRY_RUN" -eq 1 ]; then
    echo "$RELEASE_TAG"
    exit 0
  fi
  # The tag must exist on the remote before a release can be created for it.
  if ! git ls-remote --exit-code --tags origin "refs/tags/$RELEASE_TAG" >/dev/null 2>&1; then
    git push origin "$RELEASE_TAG"
  fi
  gh release create "$RELEASE_TAG" --title "Release $RELEASE_TAG" --generate-notes
  echo "GitHub release created: $RELEASE_TAG"
  exit 0
fi

# Default to HEAD when no SHA is provided.
if [ -z "$SHA" ]; then
  SHA=$(git rev-parse HEAD)
fi

# Resolve the version: explicit input wins, otherwise generate per-day counter
# (starting at 0 for the first release of the day).
if [ -n "$VERSION" ]; then
  TAG="$VERSION"
else
  TODAY=$(date +%Y.%m.%d)
  TAG_PREFIX="v${TODAY}"
  LATEST=$(git tag -l "${TAG_PREFIX}.*" | sort -t. -k4 -n | tail -n 1)

  if [ -z "$LATEST" ]; then
    BUILD_NUMBER=0
  else
    LAST_NUMBER=$(echo "$LATEST" | awk -F. '{print $4}')
    BUILD_NUMBER=$((LAST_NUMBER + 1))
  fi

  TAG="${TAG_PREFIX}.${BUILD_NUMBER}"
fi

if [ "$DRY_RUN" -eq 1 ]; then
  echo "$TAG"
  exit 0
fi

if [ "$BUMP" -eq 1 ]; then
  # Update package.json version and commit the bump on the current branch tip.
  # We always tag the bump commit so the release points to a consistent state.
  sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"${TAG#v}\"/" package.json
  git add package.json
  git commit -m "Bump version to ${TAG#v}"
  TAG_COMMIT=$(git rev-parse HEAD)
else
  TAG_COMMIT="$SHA"
fi

# Create an annotated tag and push it (and the bump commit, if any).
git tag -a "$TAG" -m "Release $TAG" "$TAG_COMMIT"

if [ "$BUMP" -eq 1 ]; then
  git push origin HEAD
fi
git push origin "$TAG"

# Create a GitHub release to trigger the deploy workflow.
if [ "$CREATE_RELEASE" -eq 1 ]; then
  gh release create "$TAG" --title "Release $TAG" --generate-notes
  echo "GitHub release created: $TAG"
fi

echo "Created and pushed tag: $TAG (commit $TAG_COMMIT)"
