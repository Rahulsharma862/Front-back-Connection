import { useState , useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [products, setProducts] = useState([])
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(true)
  const [search, setsearch] = useState('')

if(error){
seterror(true);
console.log("There,s something Wrong");
}


useEffect(() => {

const controller = new AbortController();

  (async()=>{
try {
  seterror(false)
  const response = await axios.get('/api/products?search=' +search , {
    signal: controller.signal
  });
  setProducts(response.data);
  setloading(false)
  console.log(response.data);
} catch (error) {
  if (axios.isCancel(error)) {
    console.log(error.message);
    return;
  }
  seterror(true)
  console.log(error);
}
}

)()

return()=>{
  controller.abort();
}

},[search])

  return (
    <>
     
     <input type="text" 
     placeholder='Search Here'
     value={search} 
     onChange={(e)=> setsearch(e.target.value)}
     />

    {loading && <h1>Loading.......</h1>}
    <h1>Number of products are : { products.length}</h1>
    </>
  )
}

export default App
