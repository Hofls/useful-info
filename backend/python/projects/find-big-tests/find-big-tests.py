import os
import re

def find_test_methods_in_file(filepath):
    """Return a list of (method_name, size_in_lines, line_number, filepath)."""
    results = []
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    i = 0
    total_lines = len(lines)
    while i < total_lines:
        line = lines[i].strip()
        if line.startswith('@Test'):
            start_line_number = i + 1  # 1-based line number
            # find next method signature after @Test
            j = i + 1
            method_start = None
            while j < total_lines:
                if re.match(r'(public|protected|private|\s)*\s*void\s+\w+\s*\(', lines[j]):
                    method_start = j
                    break
                j += 1

            if method_start is None:
                i += 1
                continue

            # find method end by counting braces
            brace_count = 0
            method_name_match = re.search(r'void\s+(\w+)\s*\(', lines[method_start])
            method_name = method_name_match.group(1) if method_name_match else 'unknown'
            k = method_start
            while k < total_lines:
                brace_count += lines[k].count('{')
                brace_count -= lines[k].count('}')
                if brace_count == 0 and k > method_start:
                    break
                k += 1

            method_end = k
            size = method_end - method_start + 1
            results.append((method_name, size, start_line_number, filepath))
            i = k
        i += 1

    return results


def main():
    all_methods = []

    for root, _, files in os.walk('.'):
        for filename in files:
            if filename.endswith('.java'):
                path = os.path.join(root, filename)
                methods = find_test_methods_in_file(path)
                all_methods.extend(methods)

    all_methods.sort(key=lambda x: x[1], reverse=True)

    top_100 = all_methods[:100]

    output_file = 'big-tests.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        for method_name, size, line_number, filepath in top_100:
            f.write(f"{size:4} lines | {filepath}:{line_number} | {method_name}\n")

    print(f"Results written to {output_file}")


if __name__ == '__main__':
    main()
