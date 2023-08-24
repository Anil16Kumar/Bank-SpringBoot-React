import React from 'react'

const Pagination = ({ pages, currpage ,setCurrpage ,list}) => {

    const increasePage =(e)=>{
        e.preventDefault()
        currpage+=1
        if(currpage>pages) currpage =0
        setCurrpage(currpage)
        list()

    }

    const decereasePage =(e)=>{
        e.preventDefault()
        currpage-=1
        if(currpage<0) currpage = 0
        setCurrpage(currpage)
        list()
    }

  return (
      <nav  className="text-center">
          <ul class="pagination">
            <li class="page-item"><a class="page-link"  href='' onClick={decereasePage}>Previous</a></li>
            <li class="page-item"><a class="page-link"  >{currpage+1}/{pages+1}</a></li>
            <li class="page-item"><a class="page-link" href='' onClick={increasePage}>Next</a></li>
          </ul>
        </nav>
  )
}

export default Pagination