"use client"

import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MenuItem() {
  const menuItems = [
    {
      id: 1,
      name: "Dabeli",
      price: "₹50",
      rating: 4.5,
      votes: 12,
      description: "\"Dabeli\" combines tangy tamarind chutney, spicy garlic chutney, and savory potato filling, garnished with pomegranate and peanuts.",
      image: "/placeholder.svg?height=100&width=100",
      mustTry: true,
    },
    {
      id: 2,
      name: "Vada Pav",
      price: "₹55",
      rating: 4.0,
      votes: 10,
      description: "Vada Pav bursts with a vibrant blend of spicy, tangy, and savory flavors.",
      image: "/placeholder.svg?height=100&width=100",
      mustTry: true,
    },
    {
      id: 3,
      name: "Kurkure Chaat",
      price: "₹100",
      rating: 4.2,
      votes: 8,
      description: "Crispy Kurkure tossed with tangy chutneys, veggies, and spices.",
      image: "/placeholder.svg?height=100&width=100",
      mustTry: false,
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Chaat</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {menuItems.map((item) => (
          <Card key={item.id} className="flex overflow-hidden">
            <div className="relative w-32 h-32">
              <img
                alt={item.name}
                className="object-cover w-full h-full"
                src={item.image}
              />
            </div>
            <div className="flex-1">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {item.mustTry && (
                      <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-600 hover:bg-orange-100">
                        MUST TRY
                      </Badge>
                    )}
                  </div>
                  <span className="font-semibold">{item.price}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.votes} votes
                  </span>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}