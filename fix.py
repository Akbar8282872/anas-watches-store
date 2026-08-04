import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = content.replace('Anas Watches Store', 'AFLAH STORE')
    content = content.replace('Anas Watches', 'AFLAH STORE')
    content = content.replace('ANAS <span>WATCHES</span>', 'AFLAH <span>STORE</span>')
    content = content.replace('ANAS <span style="color: var(--gold);">WATCHES</span>', 'AFLAH <span style="color: var(--gold);">STORE</span>')
    
    content = content.replace('wa.me/923249970874', 'wa.me/923433467891')
    content = content.replace('0324 9970874', '0343 3467891')
    content = content.replace('03249970874', '03433467891')
    content = content.replace('0370-6178733', '0343-3467891')
    content = content.replace('03706178733', '03433467891')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated', filepath)

for root, _, files in os.walk('c:/new property project/frontend'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            replace_in_file(os.path.join(root, file))
