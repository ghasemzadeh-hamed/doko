@echo off
setlocal

rem مسیر پروژه Django خود را تعیین کنید
set projectDir=D:\Doko\code\doko\dokoplatform\backend

rem مسیر فایل خروجی را تعیین کنید
set outputFilePath=D:\Doko\code\doko\dokoplatform\file.txt

rem حذف فایل خروجی اگر وجود داشته باشد
if exist "%outputFilePath%" (
    del "%outputFilePath%"
)

rem تابعیت دستورات برای گرفتن ساختار پروژه و نوشتن آن در فایل خروجی
for /r "%projectDir%" %%i in (*) do (
    echo %%i>> "%outputFilePath%"
)

echo ساختار پروژه Django با موفقیت در فایل متنی ذخیره شد.

endlocal
