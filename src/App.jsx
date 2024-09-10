import { useState, useRef } from 'react'
import sonnetsData from './data/sonnetsData'
import Header from './components/Header'
import './styles.css'
export default function App() {
  const inputRef = useRef()
  const [searchInput, setSearchInput] = useState("")
  const [filteredSonnets,setFilteredSonnets]=useState([])
  const [searchPerformed, setSearchPerformed] = useState(false)

  function handleClick() {
   const inputValue=inputRef.current.value.trim()
   setSearchInput(inputValue)
   setSearchPerformed(true)

    if (inputValue) {
      const filtered = sonnetsData.filter((sonnet) =>
        sonnet.lines.some((line) =>
          line.toLowerCase().includes(inputValue.toLowerCase())
        )
      )
      setFilteredSonnets(filtered)
    } else {
      setFilteredSonnets([]) 
    }
  


    
  }

  /* Challenge

  Kullanıcı " Arama " butonuna tıkladığında, input alanına yazdığı metin searchInput state'inin değeri olur (bu kod zaten yazılmıştı).    
 1. SonnetsData array'indeki satırlarından birinde searchInput değerini içeren her bir sonnet için "sonnets-container" div'inde className'i "sonnet" olan bir div oluşturun (satır 27). 
    
    2. "sonnet" div'inde, sonenin number özelliğini bir <h3> öğesinin metin içeriği olarak ekleyin ve ardından lines özelliğinden/dizisinden sonenin *her* satırını bir <p> öğesinin text içeriği olarak ekleyin, böylece sonenin her satırı için bir <p> elde edin. 
       
    3. "Love", "summer", "winter" ve "strange" gibi yaygın sözcüklerin yanı sıra "hello" ve "weird" gibi hiçbir sonede geçmeyen sözcükleri arayarak kodunuzu test edin.
*/

function highlightMatch(line) {
  if (!searchInput) return line  // Arama yapılmamışsa vurgulama yapar
  const regex = new RegExp(`(${searchInput})`, 'gi') // Eşleşen kelimeyi bulmak için RegExp kullanılır.
  const parts = line.split(regex) // Metni parçalarına ayır/
  
  return parts.map((part, index) =>
    regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
  ) // true ise  Eşleşen kısmı <span> içine alırız
}

  return (
    <div className='wrapper'>
      <Header searchProps={{ inputRef, handleClick }} />

      <div className='sonnets-container'>
        { searchInput && filteredSonnets.length===0?(<p className='no-results-message'>Ne yazık ki,araman sonucunda hiç bir şey bulamadın</p>):(
        
        filteredSonnets.map(item=>(
          <div className='sonnet' key={item.number}>
            <h3>{item.number}</h3>
      
            {item.lines.map((item,index)=>(
              <p key={index}>{highlightMatch(item)}</p>
              
            ))}
           
            
            </div>)
        ))}
       
      </div>
    </div>
  )
}

/*Bonus Challenges
      
    - Arama sonucu yoksa, "sonnets-container" div'inde "Ne yazık ki, araman sonucunda hiçbir şey bulamadın." yazan bir <p> öğesi oluşturun. <p> öğesine "no-results-message" şeklinde bir className verin. 
      
    - Sonuçlar varsa, sonedeki searchInput değeriyle eşleşen her kelimenin etrafına bir <span> koyun. Böylece kelime otomatik olarak vurgulanacaktır (CSS zaten ayarlanmıştır). 
*/
