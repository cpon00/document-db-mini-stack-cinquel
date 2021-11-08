# Schema Diagram

<center><img src = "./assets/schema.png" ></center>

# Collections

## Movie Collection

| Movie             | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| id                | int                                                                                         |
| title             | string                                                                                      |
| release_date      | date                                                                                        |
| original_language | string                                                                                      |
| budget            | int                                                                                         |
| genre             | id:int, name:string                                                                         |
| keywords          | id:int, name:string                                                                         |
| overview          | string                                                                                      |
| popularity        | double                                                                                      |
| vote_average      | double                                                                                      |
| runtime           | int                                                                                         |
| cast              | cast_id:int, character:string, credit_id:string, gender:int, id:int, name:string, order:int |
| crew              | credit_id:string, department:string, gender:int, id:int, job:string, name:string            |
