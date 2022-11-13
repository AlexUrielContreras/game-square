const bubbleSort = (arr) => {
   let sorted = false
   
   while(!sorted) {
      sorted = true
      for (let i=0; i<arr.length; i++) {
         if (arr[i] > arr[i+1]) {
            const temp = arr[i]

            arr[i] = arr[i + 1]
            arr[i + 1] = temp
            sorted = false
         }
      }
   }
   
   return arr
}


export default bubbleSort