import os, re

def find_tests_in_file(path):
    results = []
    with open(path, encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    i = 0
    while i < len(lines):
        line = lines[i]
        if line.strip().startswith('@Test'):
            indent = len(line) - len(line.lstrip(' '))
            # find method start
            j = i + 1
            while j < len(lines) and not re.match(r'\s*(public|private|protected|void)', lines[j]):
                j += 1
            name_match = re.search(r'\b(\w+)\s*\(', lines[j]) if j < len(lines) else None
            name = name_match.group(1) if name_match else 'unknown'
            # find method end (first } at same indent)
            k = j + 1
            while k < len(lines):
                l = lines[k]
                if l.strip().startswith('}') and len(l) - len(l.lstrip(' ')) == indent:
                    break
                k += 1
            size = k - i + 1
            results.append((size, os.path.basename(path), name))
            i = k
        i += 1
    return results

def main():
    results = []
    for root, _, files in os.walk('.'):
        for f in files:
            if f.endswith('.java'):
                results += find_tests_in_file(os.path.join(root, f))
    results.sort(key=lambda x: x[0], reverse=True)
    with open('big_tests.txt', 'w', encoding='utf-8') as out:
        for size, file, name in results[:100]:
            out.write(f"{size:4} | {file} | {name}\n")
    print("Results saved to largest_tests.txt")

if __name__ == '__main__':
    main()
