key = input("輸入身分證:")

# 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1
letter = {
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17,
    'J': 18, 'K': 19, 'L': 20, 'M': 21, 'N': 22, 'P': 23, 'Q': 24, 'R': 25,
    'S': 26, 'T': 27, 'U': 28, 'V': 29, 'X': 30, 'Y': 31, 'W': 32, 'Z': 33,
    'I': 34, 'O': 35
}
mut = '876543211'

sum = 0
sum += int(letter[key[0].upper()] / 10) + (letter[key[0].upper()] % 10) * 9
for i in range(1, len(key)):
    sum += int(key[i]) * int(mut[i - 1])

if sum % 10 == 0: print('輸入正確')
else: print('輸入錯誤')
