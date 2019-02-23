from math import *
import matplotlib.pyplot as plt
import numpy as np

precision = 200

savedAnts = [[266,-65,-163,-87,15],[158,-58,-17,181,278],[-84,-54,94,166,135],[11,-49,-9,-18,1],[-25,-37,-43,8,-18],[42,36,2,21,-33]]

def calcul(code,n):
    r = code[0] * n * n + code[1] * n + code[2]
    r = min(r,code[3])
    r = max(r,code[4])
    return r
    
x = []
y = []

nFig = 1
taille = ceil(sqrt(len(savedAnts)))
titres = ["fourmis","nourriture","nid","fourmis/carrying","nourriture/carrying","nid/carrying"]
i = 0

for a in savedAnts:
    x = []
    y = []
    for j in range(precision):
        x.append(30*j/precision)
        y.append(calcul(a,30*j/precision))
    #print(x)
    #print(y)
    plt.subplot(taille,taille,nFig)
    plt.plot(x,y)
    plt.title(titres[i])
    i += 1
    nFig += 1
    if (nFig == taille + 1): 
        nFig += taille
    plt.autumn()
    plt.show()