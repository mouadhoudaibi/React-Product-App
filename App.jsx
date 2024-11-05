import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './App.css';
import './components/Catalogue';
import iphone from './images/iphone.png'
import ipad from './images/ipad.png'
import macbook from './images/macbook.png'
import applewatch from './images/applewatch.png'
import hestory from './images/1984.jpg'
import gatsby from './images/gatsby.jpg'
import hobbit from './images/hobbit.jpg'
import mobydick from './images/mobydick.jpg'
import kill from './images/to-kill.jpg'
import war from './images/war-and-peace.jpg'



const MAX_QUANTITY_PER_PRODUCT = 3;
const PRODUCTS_PER_PAGE = 12; 

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1); 
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const products = [
    { id: 1,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'phone' ,  name: 'iPhone 13', description: 'Description du produit 1', price: 999, image: iphone },
    { id: 2,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'phone' ,  name: 'iPad', description: 'Description du produit 2', price: 800, image: ipad },
    { id: 3,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'laptop' ,  name: 'MacBook Pro', description: 'Description du produit 3', price: 1299, image: macbook },
    { id: 4,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'watch' ,  name: 'Apple Watch', description: 'Description du produit 4', price: 350, image: applewatch },
    { id: 5,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'airpods' ,  name: 'AirPods Pro', description: 'Description du produit 9', price: 249, image: 'https://th.bing.com/th/id/OIP.WJyC1Kfzzd69OGrNgFnYbAHaIc?rs=1&pid=ImgDetMain' },
    { id: 6,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'laptop' ,  name: 'HP ', description: 'Description du produit 9', price: 50, image: 'https://th.bing.com/th/id/R.7e8f0c920dd844febe71c46d1f5b063a?rik=%2fzhbOaSfayYvAQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f7%2fHP-Laptop-Transparent-PNG.png&ehk=O%2f9Dn0B98REQNJVH96DDCUy4uBext9OumBhAg87%2ftu0%3d&risl=&pid=ImgRaw&r=0'},
    { id: 7,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'phone' ,  name: 'samsung s21 ultra', description: 'Description du produit 9', price: 50, image: 'https://th.bing.com/th/id/OIP.tmAGtlfUhKyc6O6lEO9uNAHaHa?w=600&h=600&rs=1&pid=ImgDetMain'},
    { id: 8,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'laptop' ,  name: 'DELL', description: 'Description du produit 9', price: 50, image: 'https://th.bing.com/th/id/R.f926fef2a634d3ca11ebb80bc177a16c?rik=3DYdPSmTHz2akw&riu=http%3a%2f%2fgraphics.secondipity.com%2fgr%2fimages%2fnw%2fdellxps139001slv.jpg&ehk=asfSEYCNrvoOIoTVmeR5EiPimCfIOe%2bsZF%2boR33ZK5Y%3d&risl=&pid=ImgRaw&r=0'},
    { id: 9,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'airpods' ,  name: 'AirPods 2', description: 'Description du produit 9', price: 179, image: 'https://th.bing.com/th/id/OIP.u0iabmWiJg3rJOF3xz-bTAHaHa?rs=1&pid=ImgDetMain'},
    { id: 10,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'earphone' ,  name: 'Apple Earphone', description: 'Description du produit 9', price: 25, image: 'https://ss7.vzw.com/is/image/VerizonWireless/apple-earpods-usb-c-mtjy3am-a-a-iset'},
    { id: 11,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'headphone' ,  name: 'Headphone', description: 'Description du produit 9', price: 549, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1724927451276'},
    { id: 12,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'speaker' ,  name: 'HomePod mini - blue', description: 'Description du produit 9', price: 99, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-blue-202110?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1632925511000'},
    { id: 13,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'speaker' ,  name: 'HomePod - Midnight', description: 'Description du produit 9', price: 299, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-select-midnight-202210?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1670557210097'},
    { id: 14,  maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'tech' , category: 'ELECTRONIC' , class: 'vision' ,  name: 'Apple Vision Pro', description: 'Description du produit 9', price: 4000, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAEOAPEDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECBAUGBwMI/8QAQhAAAgIBAgIIAgcFBgYDAQAAAQIAAwQFERIhBhMxQVFhcYEUIgcjMkKRobEzcoKSwRVDUmKi8CRTY7LR4TSD8cL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAdEQEBAQACAgMAAAAAAAAAAAAAAREhMQJBEjJR/9oADAMBAAIRAxEAPwDrcREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERECYkRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQJiIgRERAREQERLXJ1DBxFZrrlHCNyBzMC6j/fOahqHTOiirUbMWnrPgOAZI4l6ytm223VyOzfdvATXc7pNqGRl5GH8WAbdP8AiNPtoB4WtJKnjRxtsp2G2/PfeB0m3NwaP2uRWv8AECfymOu6SaNSyr1pZmYIijYF3P3V37TOUf25ex0DP5hLBZp+alzNYhusGwsZD8vFuCOzvli2Tlpi5WJW21ujZvxuCo5EVuTaux7eYLKYHVb+mWmVV5l3AeqwnFWU3zt1Nh22Rwo4t+zulLdLkW63HOOBdVjjLsU77CknbcNvwk+W+/lOYNeLcp92ZsbWcQMNydmuRNx7su4P7s8lybEqw8l2JfBd8HN57k1HZS59Rwv7GB1Knpjj3fAcNQPx9bW4g4H3dFUsS255chvz2l1R0r0y5EfdeB7HpVg3CGtQ7NWoccyO8Tk+9tPX0pzswbfisfb71Lk8Sg+G5I/iEuEyXrZWpYsKmXU8Pv8AkYbWBQe/nv7mB2fH1HAyAOrtXc7cmI/Ucpd7g8wZyvTsliGUOd02et1Y7mt/mBmw4us52PsOLjTwP+9oG6RMNja9h2hRbvWx8eQ/P/zMgudgsOJbgQB3Bj+ggXMgsqjdiAPFiAPzmOt1BzyqXhH+Jtix9B2frLNrHc7uzMfFiT+sDOLZW3JXU+hBlUwAM9kychPs2N6E8Q/OEZmJjFz8jkCqN7EH8pa5+vVYoNWwbK2501ON037OtsIIX02J8u+DWYuyMehbHtsVFrUvYzMqqijmWdm2UDzJE0rUfpO6L4lrU4iZWeVbhe3HCJRy7eF7SCfZdvOWGo206rsuoqmRWr8aY5Lriq3YD1QbYnzbiPpMZk6b0YOPc+Rp+BTRUhay5KxQaxt2h6tm38P0M18aa3fRum3RjW3rooyWx8uzYLj5qip2Y9yMCUPls2/lNlny5ktiJk3fA2XNjCw9Q16hLindxhCRv/v06/8AR70ut1NP7G1K0vm01l8O5zu2RSg+atyeZZe0HvHmu7ZV0SIiAiIgIiICW+Rl4+MpNjDcfdBG/jz35TH6rrNGDVY3GqqrKj2HcgMzBQF27/OaJqGrW33BLuIVNk24l1fEltT15C/LYrsNySB+fcYGd1jpS6V5qUFVenGXIKMWQtU3Mms7EsQNz4ctt5pWo5+RlnVaQzOtmLj6jhNbtx1NQC/ArJtuN1bffx8p4q7WPp3Wk8/jNMt4iTsBsACT6mWtL8A0bIcE9Vbdp94PZ/zAD7hxA9Gu+JzMay1y9esae1FrE77vXvWSd+/hZfwlitlqYumZLE9fpeYcLJ8erc9U2/oQD7z0sranDyKv7zRdQ4xy5/DlurYjyKlW9p7PXXZm5+Kf2Os4nXpv2C4jq2I9GAb3geD0dZZremggDIVdQwT/AIXc8ZA9GH5wt4azSNRPJcpDgZYPYrsd1J9GBHvKBc/w+j6g24twrzhZnkjnqzv5Bhv7z0OPxPrOmdguUZ+Cf8LOeLZfRh+cDz6qxcfNxE/b6ZkLl4m53JqJ65B/3LPcGmzIVlG+Nq+INh/1kUuo9wWHtKFv4n0jUCNhkKcDKB+67/Z39GBHvKersSjPxk/babkrmYo7+qY9co/7hArrsK14d9h+bEsbT8zfvqOyBiT5FW9p6rvQLA3NtPv4tufzYt2/EPb5h+Egiq3IsVTvRquH1qb9nW1rxD/ST/LFb8XwF1p/bV2adlFuX1q/KCfUgfzQMlgP1FqoTyps6gnxot+as/09psdYewqqKWc9gUbmYjSNA1DLSi3J48XHFL478a7ZF61v9XZWp7Bt3n8JudFNOOgSpeEbDcnmzbd7N2mEW9GngbNkMD39Wh5fxN/4l8oVFCoFVR2KoAA9AJG5k7wKt5O4lErC/K9rsldNY4rbbWCVoviztyAgSNz/AL7YyL8bFp67LuSikk8BfcvYR92qtfmY+gmB1PpVpunqy44Vio2+Lyhw0nv+opOzt6kAeRE51qfS+y+622oPkZD7g5GWSSBvvtXWOQHgOQ8pqT9G/wCodI7GSxcU/BY3Y11jouTYP399kHkpJ/zd01a3X9IpJQZKnYk7Uo7jc9vzDl+c0PKz83NfrMi5nbsG/wBlR4KByEteI+MuydJm9t7u6TaXXWzo11tm+yVBChY+JZtwB+M1rU9azdVKLaVqprJNVNZPACfvNvzLeZmJ3MkRfK0kxWCfwmQ07NydPy8TNxn4L8W5L6j/AJkO+x8j2HyMsVHF69x8fIz0UEd3tMtPp7TM+jVNPwNQoI6rMoruUb/ZLD5lPmDuD6S8nOPos1Q34Go6TY274VwyqATz6nIJ4gB5MCf4p0eQTEiICY7UswUI9ak8RXdyB82xHJV8z2e/nyv3YIjuexFZj6AbzTtZttdKQyhkuse25SivW3CAeFgzBhzO4IB22HhAwGdlW5VpbcgNx0Mh6xFOPeHU02VsSOJWA3P/AOTBWktVa2554uFm1qSTs1D9W/P8d5kcmywdY3Ex4R1gG+53qeu7n7cUteBFsRTv1a5ORhOf+hlr1iH07YFrkDb+0eHtruxtTr270s+3t/MfwlF9fEdXpTtuqr1bFA/xr9awX3Dj3nugA+AN3If8TpGX4jfi4Sfxb8J4K9lCYFzfttOy3wMkeNbseEkeHED/ADQIDVPlYdznfH1bBONce7rK16sn1KlT7SyPWpg02Pv8TomYabzvzNJYUWE+X2WlzZQa6dTxKxu+nXrqOGAPmbH249h/ASP4Z6HqmzKrH2OJreIardtthciip/cqVPtA8WprfM1HDP7DV8X4qk8tha3yvt6MA3vLcXP8PpOoNuLsK44OZ3EI54Dv6EA+8rPWphV2Pv8AFaHlmu/btNJPVOT/AKWnu1KPmahiH9hrGL8TSe4XbcL7e4DQPFsfc6zp3Z1irn4RH3S/zEL6MPzla28d2k5pGy5tTYWQO4WEcS7n1BHvPNLn6rR89txZjWtgZu/bwser5+4B95e4Ok5Wo2appdBFS0ZVOZTkspavGW1haBy7TuDsN+/wgW+LjZl4qxMSlrszTs8CtBsCcd24gWZuQXhLAk+HtN40zo7hYLWXZHDlXvkfEoHUGnHs2C71Ke08t9z7bTIYeDh4C2DHrUPaVa+0gdbcyjYGxh4dw7BLrcwirfeN5HOOfKBVKkR7GCopYnuAlpqOoaVo2L8Zq2UMaluLqUA48jIYD7NNQPEe7n2DfmROba5091jVEsxtLr/s3THJr2Fi/GZQ7CHt7OfgOXPbnA3/AFTpJoOjdYlly5Waiu3w9Dg1qU7ndN9z4hd/Mic51jprqepAWFfqVbgWkjhqqIJIeisbqD5niPn4avdkXi1mcs1bE9Xz2IA5DhbtBHfLVrbXBDuzDcHY9m45CanArvycnJcvfa9jdm7sW2HbtznjESBERASoSmVD+sKyGnYj5mTjYyMivfYKkawkIGPZxEAn8ptD9C9b4VNYxLWI2K13FWHr1qqPzmr4FzUX0XL9qqxLV8yjBwPynacW1LUqtQ7paiWIR/hcBhLJqNG6G2ZmgdLsDEza3x3yeLAyK3K9mSgeo7qSuxITbn3zuc4306pONk6BrFO63qxqLDvfEdcir35ke06/jXpk4+Nkp9jIpqvT92xQ4/WZV6xJiB4ZQJxskAkHqn+z28hvNSzaxkUq68JakupA4XZQwAPznw5bzcWUOrKexlKn3G01IFkusrIGyqNht4HhIMI1S0KG3YDhDKW/cJNbj8G/KWTVuwNRH1ltD0Ant+LwX3Qe42mwaphqhOQi74z8rtuXVht6238ue49Pxwji4cRG/XDhyE5duVh/Javqy84VbOpyOuCbb6hjV5lA5/8AzKPtLz7zt/r/AB8yK8ixSzcNGsY3VO3ZwZdQA4j58kb8Z7uOFbeo/uiNWwCvfU37WtfTn/KPGeVlXWHIop2/4kLqmm7dguXfjqHr8y+4geC22INOz2Xa3FtOm56n/DxHh4vQ8S/xCeL47rTqWn187cCxdS048t3p2NiqPVSy+ol1vTdYtjnbF1qlqMg/8vMRR8/r9l/VTPEW31piZjjbK0m84OevbvSz7BvQN+TwAelsrEyjzxNaxTjZHh1yJw7+pUj+WWpFtWEOLnk6BmFbD3tjkhGPuCply2Ny1PTau7g1XSTv5mwVg/zJKkeu6/T8xUL0avj/AAGUgH9+BwJv5kHYekCvG019Qz9S06rdcfUsWvP65V3TH3YIzdoG+4+Ub8/znQMbHoxKKselSErUDdju7tsAXcjtY98stG03+ytPxcR7BbciDr7QNuN+fId+w7B6ecyMCqSJSJZZuqUYWRgYa02ZGXmWVKtVf3Udthv5t3eA5wjIqGYhVBJJAAA3JPgBNZ6SdM9P6P8AXYWEtObrIJRxvxYmCR29cVPzOP8ACDy7zy2OJ6YdNRinJ0nQbtrzxVZ2fU25r7moxHHeOYZx6DxPL5Rd6hqOo6plXZuoZNuTlW/bstO527lUDZQo7gAAJ5q9NgU2bhqh2A7CxBz2G/Yf99st94gVO7O7ue1mZiB2Ak78pTIiBMmQJMBERASoSmVDshVzQ2zL7TrXRm/rtJ0877mpXoPPc/VOVH5bTkVZ5zovQvK4qM3GP93ZXevpYOBvzUfjLO0ZrpjinK6P32KN2wcijL/+s70v/wBwPtNu6F5LZXRfo9ax3ZcMY7b+OO7U/wBJicioZOn6pQefXYGbXsfE0Pt+e0n6M7DZ0WoUknqs7OrG/cC4s2/OSkbtEiJFJq+q1dRn8fYth4t/Kz/3vNomJ1qhbKK7TsDWwVj2fKx5c/X9YGHIVlsVgGR1ZLEI3VlYbEETAahpt1DG/ERnrHDkVkc3qvpHDwt37Ou438QN/PI33X1EFWAIO4B5ow8DPfHylvQWVkq6kixe9WHcYRpxIHC+Nz6jfUMLsPHiufr6P4f/AOfOeTV7BqcffiqI1PSiO1qj+0oB8RsQP3R4zeLNMxbjVZZiUiytmsR6iKrFZu0/IR29/bNYz9KzMGwV0Jaa1tbL0q3hb6pxzfFsK8hv909/LwMKxTJVfx1VkLj6qPisJuxcfOQ8RX03P4P5SkWKzVZdtZ6rJRtL1io9qWKvVq7eoHCfNR4z1VKskNXSD1Oa3xGOUUn4LPTtVwvMKSe/uJH3Zsml9FszPdsnJVK0yFRctW2sxbmTYCxFKhmbkDvyG4gaxTi5h+FpXc5umXumPcwdasnGfbcK4U7n7JAHfvNl07o/dhWJl5VRrrtsfKoxbRWRVkf8ytQu4C7nh3585vOn6PpumogoqBsRQgts2ZwB3L3AeQAmP1Wzjy3XflUiJ+I4j+sCwkyIhE7gA78hsd5pHS3UzpdVleGtp1bUEYZGady2FhsAOrRgNg9gIG/aFP8Am5bhk3V0U3XWAmqitr7F734SAtY/eJC+85P0o1C6y34RrOK1nOVnMD9u+zmF9AOz/wBTUnGprWJBkx2yKpiSRtIgIiTACTEQEREBKh4SmVDshXonbNz6GXcOoWVk/tcS0epRkcf1mmIJtvQ9GbVaiOxMfJZvQhV/rL7R1Kgjhs37Oqu338OrbeeP0Y1snRaliCBdn51ieahhXv8AkZbanlrp2i61mtsDTg3pXv323L1CL+Lb+02Ponp76X0c0HCcbWV4ddloI2ItuJuYH0Lbe0lIzkREikt82k5GLk0j7TJun7yniA/KXEQNCvTrEdCNmG/D4g+Ew+NmHGy63YngZxVcD2bA8jNz1jTnR3y6V3rY8Vyj7jd7eh75oGeHOVmV0KbOHhsPVjfh+YHmYRvXF3g+frKlZzyBP4zHadc1mLjh9+NK1Vt+0gcgZfK2wbbv2hXoa03JNdRJILEou7Edm/KXIzc1Pv7/ALwU/qJZdYY6wkQL8apkr9oVn1X/AMGY68LkW23GxlaxuIgAEDu5S2fJ6t9n+ye3y856779nZ2iBHUEdlwP7ykfoY6q4djVt7kfqJO8kb8u3aBhdcsKU41B2+uyTZYAd/q8ZQQB/EwP8M4zm3NkZeVc3bZa7exPKdg6RW1ps9rItdOFkP1jEDZrLWUAbc+4TjDcyx8SZu/WMe1JkSTEy0kc+R9j/AEkEbRJ7eR9j/QwKZIgiT3QEREBERAS+wNOztRt6nDoe6zbchOwDs3ZjyA95RgYWVqOVj4eKhe6+wIgHn3k+E6/0b6LNkYRrw8u/A0rfhOdhcK5+r3LuHtrtYHgxwdwmw3bmdwCOINJq6FanWa/jMjBxC/IJdbvYe/5V5b/jN00Po9TpNdjKGe11BvyLFCAIOYA35Ko7e3z35cqsv6LqLHZ6s2u0t2tmpkG73tW07/yyqn6MXsRKM/Xs/wCCT7OJiu5r233IBv3A/kl2GPOsJ0t1nD0zDIt0DRsivO1fKUHqczLTc1Y1bd6jv9z4Fumyy03TNO0jDowNPoWnGpHyqvMsx7XdjzLHvJl7MqmIiBERECCAQQRuCCCCNwQe4zV8jQsyvIv+ESl8VwbAGcI/GfuAEbe5Im0xA17T9BsX6zNs4T9yjHY8Kj/qWbbk+gA9Z65GmXVCx6mFlagsQdxYoA8uRmciBqW8jeZHPwHqZraFLUk7sq8zWfTwmMJgWmcpNZYDmvPl4SjAyONWpY80HEh8UPd7S6sHErA94ImCqt6jJB3O1TkMB2lG+Xb9IGw+G/YTtJDAbbg7jl/6ls2ZhjYPkVLvy4XdVIPkWlYdW2KsGG3aCD+kDQPpF6wPotgLcBGZUwG/DxApYpI8fmO059Oq9OsM5OkG5Ru2Jcl/Lt4edb/kd/4ZyqVEESJVECIkyNoEjnyPsf6GNtuUSe3kfY/+YEREQERM50f0pc+98jJS1sHDNbXLUN7ci2xglOLQO+yxtlX137oG4dCOjll611uHSzUquuzLF3D4+kcRQqrDmHyCCi/5Q57p2auuupErrRUrrVUrRFCoiKOEKqjkAO6YvQdMbTcMdetQzsopdm9V+zrYIETHqPbwVKAi+OxPaxmXkUiIgIiICIiAiIgIiICIiAllfpuBeSzVcDnfd6TwHc95A5flL2IGDt0J/wC6yht4W18/5kI/SYa3ovq5vezjxXDNugR2rCbdm5Kk+vbN1iBoWq9FMmrGoyhkNe9ak5yKuyg8RbjqHbwjfYj38ZjKkFYAXltttsdv0nUJrOq9HyxfI09QCd2sx+QBPaTUTy9v/wAgazcBkU20WEtVYjI6tzBBBBHOci1LBt07MycSwH6tz1bH79R5qwnXX462dHVkdTsyOCrKfMHnMB0h0ddVoFlXCM2gE0k7AWr31Mf08/WVHNYldldlbuliMjoxV0cEMrDkQQZRAREQERECe3kfY/0MjYxKgNxz5bDt/pAKNz5d87L9G3RnJTHp1rUUK1O3X6TjMNhzQ1jNtHediwq8AxP3wRh+g/0e3Zj0avr1BTBXhtw8G4bPlntFmQh5ivwU/a7/AJf2nZQAAABsAABIqYiICIiAiIgIiICIiAiIgIiICIiAiIgIiIFpl6dp+cvDlUI5A+V+a2L+667N+cwGT0QRtziZ1ieCZNYtH8yFT+Rm1RA5dq/0bahqX1i5On15QGwuDXLxgdi2rwHfyO+48+yc01vo3r2gW9XqeHZUhbhryE3sxbvDq7h8u/fsdj5T6clFldVqPXaiWVuCrpYqsjA9zK3KB8ncJjYz6Gz/AKO+hGeXf+zziWN2vp9r0AelQ3q/0TCWfRF0fJ+q1TVVHhZ8LYfxFayo4psZPCe08h4nsnbafok6MqwN2oataB91XxqgfUion85sGn9BOhOnMtlWk0XXLt9ZnM+U247+G4lAfRRA4Xo3RnpDrrqNNwLbai2zZNg6rFQb7Etc/wAvLwG58p17ov8ARxpGjNTmakyahqScL18Sf8HjOOYNVbcyw7mbyIAI3m9qqqqqoCqoCqFAAAHIAASZFIiICIiAiIgIiICJMQIiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiBMSIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIExEQIiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiTED/2Q=="},
    { id: 15, maxStock: MAX_QUANTITY_PER_PRODUCT  ,  type: 'books' , category: 'BOOK' , class: 'books' ,  name: '1984', description: 'Description du produit 5', price: 15, image: hestory },
    { id: 16, maxStock: MAX_QUANTITY_PER_PRODUCT  ,  type: 'books' , category: 'BOOK' , class: 'books' ,  name: 'gatsby', description: 'Description du produit 6', price: 15.99, image: gatsby },
    { id: 17, maxStock: MAX_QUANTITY_PER_PRODUCT  ,  type: 'books' , category: 'BOOK' , class: 'books' ,  name: 'hobbit', description: 'Description du produit 7', price: 13.20, image: hobbit },
    { id: 18, maxStock: MAX_QUANTITY_PER_PRODUCT  ,  type: 'books' , category: 'BOOK' , class: 'books' ,  name: 'mobydick', description: 'Description du produit 8', price: 20.45, image: mobydick },
    { id: 19, maxStock: MAX_QUANTITY_PER_PRODUCT  ,  type: 'books' , category: 'BOOK' , class: 'books' ,  name: 'to-kill', description: 'Description du produit 9', price: 22.19, image: kill },
    { id: 20, maxStock: MAX_QUANTITY_PER_PRODUCT  , type: 'books' , category: 'BOOK' , class: 'books' ,  name: 'war-and-peace', description: 'Description du produit 9', price: 23.99, image: war },
  ];

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity < existingProduct.maxStock) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  

  const removeFromCart = (productId) => {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct && existingProduct.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.class.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

   const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalWithDiscount = isDiscountApplied ? total * 0.85 : total;
  const handleApplyDiscount = () => {
    if (discountCode === 'DIMARAJA') {
      setIsDiscountApplied(true);
      alert('Code de réduction appliqué ! Vous bénéficiez de 15% de réduction.');
    } else {
      alert('Code de réduction invalide.');
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="titre">
          <h1>MAGASIN</h1>
        </div>
        <div className="cart-icon">
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </div>
      </header>

      <div className="message-reduction">
        <p>🚨UTILISER LE CODE DIMARAJA : 15% DE RÉDUCTION SUR VOTRE PREMIÈRE COMMAND🚨
        </p>
      </div>
      

      <div className="search-bar">
          <input
            type="text"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
              <button onClick={clearSearch} className="clear-button">X</button>
            )}
        </div>

        <div className="category-buttons">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={selectedCategory === "ALL" ? "selected" : ""}
        >
          ALL
        </button>
        <button
          onClick={() => setSelectedCategory("ELECTRONIC")}
          className={selectedCategory === "ELECTRONIC" ? "selected" : ""}
        >
          ELECTRONIC
        </button>
        <button
          onClick={() => setSelectedCategory("BOOK")}
          className={selectedCategory === "BOOK" ? "selected" : ""}
        >
          BOOK
        </button>
        
      </div>

      <div className="catalogue">
  {displayedProducts.length > 0 ? (
    displayedProducts.map((product) => {
      const cartItem = cart.find(item => item.id === product.id);
      const isOutOfStock = cartItem && cartItem.quantity >= product.maxStock;
      return (
        <div key={product.id} className="produit">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>Prix: {product.price}$</p>
          {isOutOfStock ? (
            <div className="out-of-stock-container">
              <span className="out-of-stock">En rupture de stock</span>
            </div>
          ) : (
            <button onClick={() => addToCart(product)}>Acheter</button>
          )}
        </div>
      );
    })
  ) : (
    <p className="no-results">Aucun produit ne correspond à votre recherche.</p>
  )}
</div>


            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={handlePreviousPage}>Précédent</button>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={handleNextPage}>Suivant</button>
                )}
            </div>
        
        
      <div className="panier">
        <h2>Mon Panier</h2>
        <div className="numbre-produit">
          <p>Vous avez {cart.length} produits dans votre panier</p>
        </div>
        {cart.length > 0 && (
        <div className="reduction">
            <label htmlFor="discountCode">Code de Reduction:</label>
            <br />
            <input
              type="text" 
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Code de déduction"
            />
            <button onClick={handleApplyDiscount}>Appliquer la reduction</button>
            
            {isDiscountApplied && <p>Reduction appliquee</p>}
      
        </div>
        )}
        {cart.map((item) => (
          <div key={item.id} className="panier-item">
            <img src={item.image} alt={item.name} className="cart-product-image" />
            <h3>{item.name}</h3> 
            <p>Prix: {item.price}$</p>
            <div className="quantity-controls">
              <button onClick={() => removeFromCart(item.id)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)} disabled={item.quantity >= item.maxStock}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id) }>Supprimer</button>
          </div>
        ))}
        <div className='total'>
          <h3><p>Total: {totalWithDiscount.toFixed(2)} $</p></h3>
          {cart.length > 0 && (
          <button className="checkout-button">
            Aller au Paiement <span className="arrow">→</span>
          </button>
        )}
        </div>
        
      </div>
    </div>
  );
}

export default App;
