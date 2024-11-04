import string
directory = "123456"
def func(directory):

    a = 0
    for i in range(len(directory)): 
        a = a + int(directory[i])
    return a
print(func(directory))


text1 = "Hello wOrld"
def funcVowes(text1):
    result = 0
    alf = 'aeuyo'
    for i in range(len(text1)):
        if text1[i].lower() in alf:
            result += 1
    return result  
print(funcVowes(text1))



def funcLetter(a, str1):
    count = -1

    lot = [0,0]
    for i in range(len(str1)):

        if str1[i] == a:
            if count == -1:
                lot[0] = i
                count += 1
            lot[1]= i
    if(count != -1):
        return tuple(lot)
    else:
        lot = [None,None]
        return  tuple(lot)
           
def fff(let, str1):
    return str1.find(let) if let in str1 else None, str1.rfind(let) if let in str1 else None
# f = "SEX"
# l = [1,2,3,4]
# print(*l, sep="\n")

grades = {
"Иван": [5, 4, 5, 3],
"Петр": [4, 4, 4, 5],
"Ольга": [5, 5, 5, 5]
}
def title(gr):
    for i in gr.items():

        gr[i[0]] = sum(gr[i[0]]) / len(gr[i[0]])
        gr[i[0]] = round(gr[i[0]],2)
    return gr


print(title(grades))
