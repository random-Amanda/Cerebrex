#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import math
get_ipython().run_line_magic('matplotlib', 'inline')
import math

titanic_data=pd.read_csv("Desktop/Titanic.csv")
titanic_data.head(10)


# In[6]:


print("# of passengers in original data: "+str(len(titanic_data.index)))


# In[7]:


sns.countplot(x="Survived",data =titanic_data)


# In[9]:


sns.countplot(x="Survived",hue="Sex",data=titanic_data)


# In[10]:


sns.countplot(x="Survived",hue="Pclass",data=titanic_data)


# In[11]:


titanic_data["Age"].plot.hist()


# In[13]:


titanic_data["Fare"].plot.hist(bin=20,figsize=(10,5))


# In[14]:


titanic_data.info()


# In[15]:


sns.countplot(x="SibSp",data=titanic_data )


# In[16]:


sns.countplot(x="Parch",data=titanic_data )


# In[17]:


titanic_data.isnull()


# In[19]:


titanic_data.isnull().sum()


# In[36]:


sns.heatmap(titanic_data.isnull(), yticklabels=False,cmap="viridis")


# In[29]:


sns.boxplot(x="Pclass", y="Age", data=titanic_data)


# In[30]:


titanic_data.head(5)


# In[31]:


titanic_data.drop("Cabin", axis=1, inplace=True)


# In[32]:


titanic_data.head(5)


# In[33]:


titanic_data.dropna(inplace=True)


# In[34]:


sns.heatmap(titanic_data.isnull(),yticklabels=False,cbar=False)


# In[37]:


titanic_data.isnull().sum()


# In[38]:


titanic_data.head(2)


# In[41]:


sex=pd.get_dummies(titanic_data['Sex'],drop_first=True)
sex.head(5)


# In[44]:


embark=pd.get_dummies(titanic_data['Embarked'],drop_first=True)
embark.head(5)


# In[46]:


Pcl=pd.get_dummies(titanic_data['Pclass'],drop_first=True)
Pcl.head(5)


# In[47]:


titanic_data=pd.concat([titanic_data,sex,embark,Pcl],axis=1)


# In[48]:


titanic_data.head(5)


# In[49]:


titanic_data.drop(['Sex','Embarked','PassengerId','Name','Ticket'],axis=1,inplace=True)


# In[52]:


titanic_data.head()


# In[51]:


titanic_data.drop('Pclass',axis=1,inplace=True)


# In[53]:


x=titanic_data.drop("Survived",axis=1)
y=titanic_data["Survived"]


# In[55]:


from sklearn.model_selection import train_test_split


# In[57]:


x_train,x_test,y_train,y_test= train_test_split(x,y,test_size=0.3,random_state=1)


# In[59]:


from sklearn.linear_model import LogisticRegression


# In[61]:


logmodel=LogisticRegression()


# In[62]:


logmodel.fit(x_train,y_train)


# In[63]:


predictions=logmodel.predict(x_test)


# In[64]:


from sklearn.metrics import classification_report


# In[65]:


classification_report( y_test,predictions)


# In[66]:


from sklearn.metrics import confusion_matrix


# In[67]:


confusion_matrix(y_test,predictions)


# In[69]:


from sklearn.metrics import accuracy_score


# In[71]:


accuracy_score(y_test,predictions)


# In[ ]:




