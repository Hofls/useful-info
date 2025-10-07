import re
import json
from pathlib import Path

# Regex patterns
base_path_pattern = re.compile(r'String\s+BASE_PATH\s*=\s*"([^"]+)"')
mapping_pattern = re.compile(
    r'@(GetMapping|PostMapping|PutMapping|DeleteMapping)\s*\(\s*'
    r'(?:value\s*=\s*)?'                   # optional 'value = '
    r'(?:BASE_PATH\s*(?:\+\s*)?)?'        # optional BASE_PATH +
    r'(?:"([^"]*)"|BASE_PATH)?'            # either literal string or just BASE_PATH
    r'\s*\)'
)

def extract_urls_from_file(filepath):
    content = Path(filepath).read_text(encoding="utf-8")

    base_match = base_path_pattern.search(content)
    base_path = base_match.group(1) if base_match else ""

    urls = []
    for match in mapping_pattern.finditer(content):
        extra = match.group(2) or ""  # fix NoneType
        full_path = base_path + extra
        urls.append(full_path)
    return urls

def write_urls_to_json(urls, output_file):
    # remove duplicates but preserve order
    seen = set()
    ordered_urls = [u for u in urls if not (u in seen or seen.add(u))]
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump({"values": ordered_urls}, f, indent=4, ensure_ascii=False)
    return ordered_urls

def write_json_diff(file1, file2, output_file="api-diff.json"):
    with open(file1, encoding="utf-8") as f1, open(file2, encoding="utf-8") as f2:
        data1 = set(json.load(f1)["values"])
        data2 = set(json.load(f2)["values"])

    diff = {
        "only_in_actuator": sorted(list(data1 - data2)),
        "only_in_java": sorted(list(data2 - data1))
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(diff, f, indent=4, ensure_ascii=False)

    print(f"✅ Diff written to {output_file}")

def main():
    all_urls = []

    # Process Java files alphabetically
    java_files = sorted(Path(".").glob("*.java"), key=lambda f: f.name.lower())
    for java_file in java_files:
        urls = extract_urls_from_file(java_file)
        all_urls.extend(urls)

    ordered_urls = write_urls_to_json(all_urls, "api-urls-java.json")
    print(f"✅ Extracted {len(ordered_urls)} URLs from {len(java_files)} files → api-urls-java.json")

    # Compare with another JSON if it exists
    write_json_diff("api-urls-actuator.json", "api-urls-java.json")

if __name__ == "__main__":
    main()
