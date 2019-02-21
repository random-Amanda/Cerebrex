#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import math
get_ipython().run_line_magic('matplotlib', 'inline')
import math

eye_data=pd.read_csv("Desktop/EYE_CLOSED_EEG.csv")
eye_data.head(10)


# In[5]:


print("# of records in the original data: "+str(len(eye_data.index)))


# In[6]:


sns.countplot(x="CLOSED",data =eye_data)


# In[8]:


eye_data["AF3"].plot.hist()


# In[9]:


eye_data["AF3"].plot.hist()


# In[11]:


eye_data["P7"].plot.hist(bins=20,figsize=(10,5))


# In[12]:


sns.heatmap(eye_data.isnull(), yticklabels=False,cmap="viridis")


# In[ ]:




