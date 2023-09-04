export const sortBy = <T>(array: T[], v: string, o: 1|-1 = 1)  => array.sort((i1, i2) => ((i1 as any)[v] > (i2 as any)[v] ? 1 : -1) * o)
