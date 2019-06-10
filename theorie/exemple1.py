from random import *
import matplotlib.pyplot as plt

nEsp = 100
nGen = 100
nEch = 250

def getEspe(p):
    result = 0
    for i in range(nEsp):
        if randrange(10000) < p:
            result += 10000
        elif randrange(10000) < p:
            result += 5000
    result /= nEsp
    return result
    
expe = [0 for i in range(nGen)]
reel = [0 for i in range(nGen)]
theo = [0 for i in range(nGen)]
indice = [i+1 for i in range(nGen)]
for j in range(nEch):
    fourmi = randrange(10000)
    for i in range(nGen):
        eee = getEspe(fourmi)
        expe[i] += eee
        reel[i] += fourmi
        theo[i] = ((i+1)/(i+2)*10000)
        newOne = randrange(10000)
        if getEspe(newOne) > eee:
            fourmi = newOne
expe = [expe[i]/nEch for i in range(nGen)]
reel = [reel[i]/nEch for i in range(nGen)]

plt.plot(indice,reel,color='blue',label="esperance de la fourmi")
#plt.plot(indice,expe,color = 'red',label="esperance mesuree de la fourmi")
plt.plot(indice,theo,color='green',label="esperance theorique")
plt.title("Esperance de la meilleure fourmi en fonction du numero de la génération. nEsp : " + str(nEsp) + " nGen : " + str(nGen) + " nEch : " + str(nEch))
plt.show()
