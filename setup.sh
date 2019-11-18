#!/usr/bin/env bash

set -euo pipefail
readonly IFS=$'\n\t'

readonly FUNCTIONS="$PWD/ci/support/functions.sh"
readonly HOOKS_DIR="$PWD/ci/hooks"
readonly HOOKS=("commit-msg" "pre-commit" "pre-receive")

# Load colours and common functions
chmod +x "$FUNCTIONS"
# shellcheck source=/dev/null
source "$FUNCTIONS"

for hook in "${HOOKS[@]}"
do
    print_info "Activating $hook"
    chmod u+x "$HOOKS_DIR/$hook"
    print_info "Linking $hook"
    ln -sfv "$HOOKS_DIR/$hook" ".git/hooks/$hook" > /dev/null
done

