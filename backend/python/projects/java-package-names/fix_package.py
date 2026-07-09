import os
import shutil
from pathlib import Path
from typing import List

def fix_java_package_structure(root_dir: str = "."):
    """
    Fixes Java package name from 'hofls.com.github' to 'com.github.hofls'
    across all projects under root_dir, handling root-level classes cleanly.
    """
    root = Path(root_dir).resolve()
    old_package = "hofls.com.github"
    new_package = "com.github.hofls"

    old_path_str = os.path.join("hofls", "com", "github")
    new_path_str = os.path.join("com", "github", "hofls")

    print(f"Starting fix in: {root}")
    print(f"Changing package: {old_package} → {new_package}\n")

    # Phase 1: Locate and migrate directories
    # We look for the base 'hofls/com/github' folders specifically to avoid skipping root files
    base_old_dirs: List[Path] = []
    for dirpath, _, _ in os.walk(root):
        current_path = Path(dirpath)
        # Check if the path ends with or contains our specific structural block
        if old_path_str in str(current_path):
            # We want the highest level 'hofls/com/github' directory, not its subdirectories
            if old_path_str in current_path.name or not old_path_str in str(current_path.parent):
                if current_path not in base_old_dirs:
                    base_old_dirs.append(current_path)

    # Move files and folders safely
    for old_dir in base_old_dirs:
        # Calculate its new matching path
        rel_str = str(old_dir.relative_to(root)).replace("\\", "/")
        new_rel_str = rel_str.replace("hofls/com/github", "com/github/hofls")
        new_dir = root / new_rel_str

        print(f"Migrating package contents:\n  From: {old_dir}\n  To:   {new_dir}")
        new_dir.mkdir(parents=True, exist_ok=True)

        # Move every item inside this directory individually to merge cleanly
        for item in old_dir.iterdir():
            target_item = new_dir / item.name
            if not target_item.exists():
                shutil.move(str(item), str(target_item))
            else:
                print(f"  Warning: {target_item.name} already exists in destination. Skipping move.")

        # Clean up the old empty structure up to 'hofls' if they are empty
        try:
            old_dir.rmdir()
            # Try to clean up parent 'com' and 'hofls' remnants if left empty
            if old_dir.parent.name == "com":
                old_dir.parent.rmdir()
                if old_dir.parent.parent.name == "hofls":
                    old_dir.parent.parent.rmdir()
        except OSError:
            pass # Directories weren't empty yet, which is fine

    # Phase 2: Update text content in source files
    file_extensions = {'.java', '.xml', '.properties', '.gradle', '.kts', '.pom', '.mf', '.txt', '.md'}

    updated_count = 0
    for file_path in root.rglob("*"):
        if file_path.is_file() and file_path.suffix.lower() in file_extensions:
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                new_content = content.replace(old_package, new_package)
                new_content = new_content.replace("hofls/com/github", "com/github/hofls")
                new_content = new_content.replace("hofls\\com\\github", "com\\github\\hofls")

                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated file contents: {file_path}")
                    updated_count += 1

            except Exception as e:
                print(f"Error processing text in {file_path}: {e}")

    print("\n=== Fix completed ===")
    print(f"Source packages migrated: {len(base_old_dirs)}")
    print(f"Files refactored: {updated_count}")


if __name__ == "__main__":
    fix_java_package_structure(".")