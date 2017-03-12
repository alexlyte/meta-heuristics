// Population Size - The population size is the initial number of random tours
// 		that are created when the algorithm starts. A large population takes longer to find a result.
// 		A smaller population increases the chance that every tour in the population will eventually
// 		look the same. This increases the chance that the best solution will not be found.
	
// Neighborhood / Group Size - Each generation, this number of tours are randomly
// 		chosen from the population. The best 2 tours are the parents. The worst 2 tours get replaced
// 		by the children. For group size, a high number will increase the likelyhood that the really
// 		good tours will be selected as parents, but it will also cause many tours to never be used
// 		as parents. A large group size will cause the algorithm to run faster, but it might not
// 		find the best solution.
	
// Mutation %
// 		When a tour is mutated, one of the cities is randomly moved from one point in the tour to another.
	
//  Nearby Cities - As part of a greedy initial population, the GA will prefer to link
// 		cities that are close to each other to make the initial tours. When creating the initial population
// 		this is the number of cities that are considered to be close.
	
// Nearby City Odds % - This is the percent chance that any one link in a random tour in
// 		the initial population will prefer to use a nearby city instead of a completely random city. If the GA
// 		chooses to use a nearby city, then there is an equally random chance that it will be any one of the
// 		cities from the previous parameter.






