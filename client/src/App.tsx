import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8080"

const App = () => {
  const [product, setProduct] = useState([])
  const [updateCount, setUpdateCount] = useState(0)

  const [form, setForm] = useState({
    title: '',
    price: '',
    discount: ''
  })

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setForm({
      ...form,
      [name]: value
    })
  }

  const addProduct = async(e: FormEvent) => {
    try {
      e.preventDefault()
      await axios.post("/product", form)
      setUpdateCount(updateCount + 1)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchProduct()
  }, [updateCount])

  const fetchProduct =async () => {
    const {data} = await axios.get("/product")
    setProduct(data)
  }

  const deleteProduct = async (id: string) => {
    await axios.delete(`/product/${id}`)
    setUpdateCount(updateCount + 1)
  }

  return (
    <div className='w-11/12 mx-auto p-12 bg-gray-200 flex gap-12'>
      <div className='w-[400px]'>
         <h1 className='text-4xl font-bold mb-8'>Data Fetcher</h1>
         <form className='flex flex-col gap-5' onSubmit={addProduct}>
           <input required onChange={handleForm} name='title' placeholder='title' className='bg-white p-3 rounded' />
           <input required onChange={handleForm} name='price' type='number' placeholder='Price' className='bg-white p-3 rounded' />
           <input required onChange={handleForm} name='discount' type='number' placeholder='Discount' className='bg-white p-3 rounded' />
           <button className='bg-rose-500 px-8 py-3 rounded text-white font-medium'>Create Now</button>
         </form>
      </div>

      <div className='flex-1 grid grid-cols-3 gap-6'>
        {
          product.map((item: any,index) => (
            <div className='bg-white rounded-lg p-8 shadow' key={index}>
              <h1 className='text-xl font-semibold'>{item.title}</h1>
              <p className='text-lg text-gray-500'>{item.price}</p>
              <button onClick={()=>deleteProduct(item._id)} className='p-3 bg-rose-500 text-white rounded hover:bg-rose-600 mt-4'>
                <i className='ri-delete-bin-2-line'></i>
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App