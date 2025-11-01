import os
from pathlib import Path

# مسیر پروژه جنگو خود را تعیین کنید
django_project_path = './'

# تابع برای خواندن فولدرها و فایل‌ها به همراه نام کلاس‌ها
def list_files_and_classes(directory):
    file_structure = {}

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    class_names = [line.split('(')[0].split()[-1] for line in content.split('\n') if 'class ' in line]
                    file_structure[file_path] = class_names

    return file_structure

# تابع برای ذخیره‌ی ساختار در یک فایل متنی
def save_structure_to_file(file_structure, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for file_path, class_names in file_structure.items():
            f.write(f"File: {file_path}\n")
            for class_name in class_names:
                f.write(f"  - Class: {class_name}\n")

# اجرای توابع و ذخیره‌ی ساختار در فایل
if __name__ == '__main__':
    file_structure = list_files_and_classes(django_project_path)
    output_file = 'structure.txt'
    save_structure_to_file(file_structure, output_file)
    print(f"ساختار پروژه به فایل {output_file} ذخیره شد.")
