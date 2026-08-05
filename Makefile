.PHONY: release diagram

release:
	./scripts/release.sh

diagram:
	@test -n "$(FILE)" || (echo "Usage: make diagram FILE=path/to/diagram.mmd" >&2; exit 2)
	./scripts/render-diagram.sh "$(FILE)"
