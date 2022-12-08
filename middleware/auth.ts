
export default defineNuxtRouteMiddleware((to, from) => {
  return /^\d+$/.test(to.params.id as string)
  })

// export default defineNuxtRouteMiddleware(
//     async (to) => {
//         console.log('abvasd');
//         console.log(to);


//     })
