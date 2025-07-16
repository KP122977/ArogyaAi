import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Define the path to the CSV
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "sample_disease_dataset.csv")

# Load the dataset
data = pd.read_csv(csv_path)

# Split into features and target
X = data.drop("prognosis", axis=1)
y = data["prognosis"]

# Encode target labels
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# Train the model
model = RandomForestClassifier()
model.fit(X, y_encoded)

# Save the model, encoder, and symptom list in one file
model_path = os.path.join(BASE_DIR, "disease_model.pkl")
joblib.dump({
    'model': model,
    'encoder': encoder,
    'symptom_list': X.columns.tolist()
   
}, model_path)

print("✅ Model trained and saved successfully.")
