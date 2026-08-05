#!/bin/sh
set -eu

usage() {
  echo "Usage: $0 path/to/diagram.mmd" >&2
  echo "Writes public/diagrams/<diagram-name>.svg" >&2
  exit 2
}

if [ "$#" -ne 1 ]; then
  usage
fi

INPUT=$1
case "$INPUT" in
  *.mmd) ;;
  *)
    echo "Error: input must be a .mmd file: $INPUT" >&2
    exit 2
    ;;
esac

if [ ! -f "$INPUT" ]; then
  echo "Error: Mermaid source file not found: $INPUT" >&2
  exit 2
fi

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

case "$INPUT" in
  /*) INPUT_PATH=$INPUT ;;
  *) INPUT_PATH=$(CDPATH= cd -- "$(dirname -- "$INPUT")" && pwd)/$(basename -- "$INPUT") ;;
esac

DIAGRAM_NAME=$(basename -- "$INPUT_PATH" .mmd)
OUTPUT_DIR="$REPO_ROOT/public/diagrams"
OUTPUT_PATH="$OUTPUT_DIR/$DIAGRAM_NAME.svg"

mkdir -p "$OUTPUT_DIR"

cd "$REPO_ROOT"
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i "$INPUT_PATH" \
  -o "$OUTPUT_PATH" \
  -b transparent
npx --yes prettier@3.8.1 --parser html --write "$OUTPUT_PATH"

echo "Generated $OUTPUT_PATH"
