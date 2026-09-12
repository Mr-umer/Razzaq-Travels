import os
from PIL import Image

logo_path = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\src\imports\image-4.png"
img = Image.open(logo_path)
print("Logo size:", img.size)
print("Logo mode:", img.mode)
