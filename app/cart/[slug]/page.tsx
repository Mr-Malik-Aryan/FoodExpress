'use client'

import { useEffect, useState } from 'react'
import { Cart } from '@/lib/interfaces'
import { Loader2, Trash2, MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CartPage({ params }: { params: { slug: string } }) {
  const { slug: uid } = params
  const [cartItems, setCartItems] = useState<Cart[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/getcart?uid=${uid}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch cart items')
        }
        
        const data: Cart[] = await response.json()
        setCartItems(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    if (uid) {
      fetchCartItems()
    }
  }, [uid])

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(prevItems => 
        prevItems.map((item, i) => 
          i === index ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (index: number) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.itemsprice * item.quantity, 0)

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-500">Cart :</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex items-center justify-between border-b pb-4">
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.itemname}</h3>
                      <p className="text-sm text-gray-500">₹{item.itemsprice} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(index, item.quantity - 1)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        className="w-16 text-center"
                      />
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(index, item.quantity + 1)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.itemname} (x{item.quantity})</span>
                    <span>₹{(item.itemsprice * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 font-bold flex justify-between">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Looks like you haven&apos;t added any items to your cart yet.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Start Shopping</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}