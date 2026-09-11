from pydantic import BaseModel,Field, EmailStr
from typing import Annotated,Optional,Dict

class User(BaseModel):
    name:Annotated[str,Field(...,max_length = 40,description = "Enter your name",example = "Muhammad Hassan")]
    email:Annotated[EmailStr,Field(...,description = "Enter your email" , example = "example@example.com")]
    password:Annotated[str, Field(...,min_length = 8,description = "Enter your password and do not share it with anyone", example = "examplepassword")]
    
class UserUpdate(BaseModel):
    name:Annotated[Optional[str],Field(max_length = 40,description = "Enter you name to update",example = "Muhammad Hassan",default = None)]
    password:Annotated[Optional[str], Field(min_length = 8,description = "Enter you password to update and do not share it with anyone",default = None)]
    
class PredictionResponse(BaseModel):
    predicted_category:Annotated[str,Field(...,description = "The category predicted by the model",example = "kl_0")]
    confidence:Annotated[float,Field(...,description = "The confidence score by the model for the predicted category" , example = 0.86)]
    class_probabilities:Annotated[Dict[str,float], Field(...,description = "This will show the probabilities of all classes for any perticular input",
                                    example={"kl_0":0.45,
                                             "kl_1":0.76,
                                             "kl_2":0.89,
                                             "kl_3":0.13,
                                             "kl_4":0.71})]
    