#!/usr/bin/env python
# coding: utf-8

# In[4]:


import pandas as pandas # used for data analysis
import numpy as numpy #used for scientific computations
import seaborn as seaborn #statistical plotting
import matplotlib.pyplot as plot
#to run the matplotlib lib in jupyter
get_ipython().run_line_magic('matplotlib', 'inline')
import math #basic math functions

eye_data= pandas.read_csv("eye.csv") #reading the dataset
eye_data.head(10) #printing the first 10 rows


# ## Cleaning the Dataset

# In[5]:


eye_data.isnull().sum()
#this shows the number of null values in each column


# In[6]:


#so this shows that the dataset has no null values


# ## Training

# In[7]:


x= eye_data.drop("CLOSED",axis=1) #independant variable
y= eye_data["CLOSED"] #dependant variable
from sklearn.cross_validation import train_test_split #to split the dataset
x_train, x_test, y_train, y_test = train_test_split( x, y, test_size=0.3, random_state=1)
# the dataset is split as testing data and trainig data to the ratio of 30 to 70


# In[8]:


from sklearn.linear_model import LogisticRegression


# In[9]:


model= LogisticRegression() #creating an instance of the logistic regression model


# In[10]:


model.fit(x_train, y_train)


# In[12]:


predictions= model.predict(x_test) #making predictions using the model


# In[13]:


from sklearn.metrics import classification_report
classification_report(y_test,predictions)  #evaluating the model


# In[14]:


from sklearn.metrics import confusion_matrix
confusion_matrix(y_test,predictions)  #evaluating the model


# In[15]:


from sklearn.metrics import accuracy_score
accuracy_score(y_test,predictions)  #finding the accuracy of model


# In[ ]:




