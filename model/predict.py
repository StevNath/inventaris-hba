import sys
import json
import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "saved_model",
    "model.pkl"
)

model = joblib.load(MODEL_PATH)

input_data = json.loads(sys.argv[1])

df = pd.DataFrame(input_data)[
    [
        "product_id",
        "previous_inventory",
        "units_sold",
        "units_ordered"
    ]
]

predictions = model.predict(df)

print(json.dumps({
    "predictions": [float(p) for p in predictions]
}))