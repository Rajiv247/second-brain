
import { useEffect, useState } from 'react'
import '../App.css'
import { Card } from '../component/Card'
import { Sidebar } from '../component/Sidebar'
import { Button } from '../component/Ui/button'
import { PlusIcon } from '../Icon/plusIcon'
import { Shareicon } from '../Icon/ShareIcon'
 import { useContent } from '../hooks/useContent'
import { CreateContentModel } from '../component/CreateContentModel'

 export function Dashbord() {
     
   const [modelOpen ,setModelOpen] = useState(false); 
   
    const {contents , refresh} = useContent();

    useEffect(() =>{
      refresh();
    }, [modelOpen])

  return  <div className="m-4" >
    
      <Sidebar/>
           
             <div className="ml-72 ">
                    
                   <CreateContentModel open={modelOpen} onClose={() => {
                    setModelOpen(false);
                   }}/>

                 <div className="flex justify-end gap-4 ml-72">
                          <Button onClick={() => {
                            setModelOpen(true);
                          }} startIcon={<PlusIcon size="md" />} size="md" variant="primary" text="share"/>
                          <Button startIcon={<Shareicon/>} size="md" variant="secondary" text="Add content" />
                 </div>

         <div className='flex gap-4 flex-wrap'>

          {/* {JSON.stringify(contents)} */}
            {contents.map(({type, link, title}) => <Card 
            type={type}
            link={link}
            title={title}
        />)}
         </div>
    </div>

    </div>
  
}

export default Dashbord
