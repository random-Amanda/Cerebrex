#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import math
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score

#get_ipython().run_line_magic('matplotlib', 'inline')

sleep_data=pd.read_csv("sleepdatasetone.csv")
sleep_data.head(10)

sns.countplot(x="Sleeping", data=sleep_data)

sleep_data.isnull()

x = sleep_data.drop("Sleeping", axis=1)
y = sleep_data["Sleeping"]

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=1)

logmodel = LogisticRegression(solver='lbfgs')

logmodel.fit(x_train, y_train)

predictions = logmodel.predict(x_test)

classification_report(y_test, predictions)

confusion_matrix(y_test, predictions)

accuracy_score(y_test, predictions)



def predictedValue(dataList =[]):

    # Xnew = [[2.79415228, 2.10495117]]
    Xnew=[dataList]
    ynew = logmodel.predict(Xnew)
    return ynew