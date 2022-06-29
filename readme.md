# [LIVE WEBSITE](https://restaurant-simulation.herokuapp.com/)

# Restaurant Simulation
## _risk analysis using monte carlo method_


## Features:
- User can _add/delete_ the details (Dish name, Prepration Time [in minutes] and Total no. of orders [this is the expected no. of orders in one day of that particular dishes]).
- Remaining fields like _Probability_, _Commulative Probability_ and _Random Number Range_ will be generated automatically.
- Select the _restaurant opening timing_, _restaurant closing timing_ and _Average Time_ (this is the expected rate at which customer come to our restaurant [in minutes]).
- Click on `Simulate`

## How this method work:
- Random number will be generated simulating the real world senario.
- According to which the customer orders a particular dish.
- `Waiting Time` represent the amount of time a particular customer has to wait to give order because chef is making previous person food.
- `Ideal Time` represents the amount of time chef has no order, and is waiting for order.

## Result:
- `Average Waiting Time` should be minimum because customer doesn't want to wait on queue (_time is precious_) [this can be done by increasing the `Avg. Time` for customer to arrive on restaurant]
- But on increasing the _Avg. Time_ , `Total Ideal Time` may also increase, it means chef has to wait for orders and has no work to perform. This is not profitable for the business.

## Conclusion:
- The efficient way to perform the _Restaurant Business_ is to maintain the balance between the `Average Waiting Time Customer` and `Total Ideal Time of Chef`.