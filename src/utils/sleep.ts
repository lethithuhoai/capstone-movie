export const sleep = (time = 3000) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
// trong async await khi mà có return thì nó luôn luôn return về promise