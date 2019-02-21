#!/usr/bin/env python
# coding: utf-8

# In[21]:


import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import math
get_ipython().run_line_magic('matplotlib', 'inline')
import math

sleep_data=pd.read_csv("Desktop/sleepdatasetone.csv")
sleep_data.head(10)


# In[4]:


sns.countplot(x="Sleeping",data =sleep_data)


# In[5]:


sleep_data.isnull()


# In[6]:


x=sleep_data.drop("Sleeping",axis=1)
y=sleep_data["Sleeping"]


# In[7]:


from sklearn.model_selection import train_test_split


# In[12]:


x_train,x_test,y_train,y_test= train_test_split(x,y,test_size=0.3,random_state=1)


# In[9]:


from sklearn.linear_model import LogisticRegression


# In[10]:


logmodel=LogisticRegression()


# In[13]:


logmodel.fit(x_train,y_train)


# In[14]:


predictions=logmodel.predict(x_test)


# In[15]:


from sklearn.metrics import classification_report


# In[16]:


classification_report( y_test,predictions)


# In[17]:


from sklearn.metrics import confusion_matrix


# In[18]:


confusion_matrix(y_test,predictions)


# In[19]:


from sklearn.metrics import accuracy_score


# In[20]:


accuracy_score(y_test,predictions)


# In[ ]:




