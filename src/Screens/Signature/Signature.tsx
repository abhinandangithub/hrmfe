import Grid from '@mui/material/Grid'
import { Tabs } from 'antd'
import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import './signature.css'

const { TabPane } = Tabs

export default function Signature() {

    const [activeIndex, setActiveIndex] = useState('1')
    const [openModel, setOpenModal] = useState(false)
    const sigCanvas = useRef<any>()
    const [penColor, setPenColor] = useState('black')
    const colors = ['black', 'green', 'red']
    const [imageURL, setImageURL] = useState<any>(null)
    // const [loading, setLoading] = useState(false)

    const create = () => {
        console.log('activeIndex', activeIndex)
        let URL: any
        if (activeIndex === '1') {
            URL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
        }

        if (activeIndex === '2') {
            console.log('URL', URL)
        }


        setImageURL(URL)
        setOpenModal(false)
    }

    const download = () => {
        const dlink = document.createElement('a')
        dlink.setAttribute('href', imageURL)
        dlink.setAttribute('download', 'signature.png')
        dlink.click()
    }

    // const getBase64 = (img: any, callback: (url: string) => void) => {
    //     const reader = new FileReader()
    //     reader.addEventListener('load', () => callback(reader.result as string))
    //     reader.readAsDataURL(img)
    // }





    function handleChangeFile(event: any) {
        console.log('event', event.target.files[0])
    }

    return (
        <Grid container spacing={6} sx={{ height: '100%', padding: 2 }}>
            <Grid item xs={12} sx={{ pb: 5 }}>
                <div className="app">
                    <button onClick={() => setOpenModal(true)} type='button'>Create Signature</button>
                    {
                        imageURL && (
                            <>
                                <br />
                                <img src={imageURL} alt="signature" className="signature" />
                                <br />
                                <button
                                    onClick={download}
                                    style={{ padding: '5px', marginTop: '5px' }} type='button'
                                >Download</button>
                            </>

                        )
                    }
                    <br />

                    {openModel && (
                        <div className="modalContainer">
                            <div className="modal">

                                <Tabs defaultActiveKey={activeIndex} centered onChange={(index: any) => setActiveIndex(index)}>
                                    <TabPane tab="Signature" key="1">
                                        <div className="sigPad__penColors">
                                            <p>Pen Color:</p>
                                            {colors.map((color) => (
                                                <span
                                                    key={color}
                                                    style={{
                                                        backgroundColor: color,
                                                        border: `${color === penColor ? `2px solid ${color}` : ''}`,
                                                    }}
                                                    onClick={() => setPenColor(color)}
                                                />
                                            ))}
                                        </div>
                                        <div className="sigPadContainer">
                                            <SignatureCanvas
                                                penColor={penColor}
                                                canvasProps={{ className: 'sigCanvas' }}
                                                ref={sigCanvas}
                                            />
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Upload" key="2">
                                        <div className="sigPadContainer ">
                                            <input type="file" onChange={handleChangeFile} />
                                            <button type="submit">Upload</button>
                                        </div>
                                    </TabPane>
                                    {/* <TabPane tab="Tab 3" key="3">
                                        Content of Tab Pane 3
                                    </TabPane> */}
                                </Tabs>


                                <div className="modal__bottom">
                                    <button onClick={() => { sigCanvas.current.clear(); setOpenModal(!openModel) }} type='button'>Cancel</button>
                                    <button className="create" onClick={create} type='button'>
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}
