import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Col, Radio, Row } from 'antd'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import { useEffect, useState } from 'react'
import TableLayout from '../../../Layout/TableLayout'
import apiClient from '../../../Util/apiClient'
import './OrganizationOverview.scss'

export default function OrganizationOverview() {
  const [state, setState] = useState({
    nodeDataArray: [],
    linkDataArray: []
  })
  const [show, setShow] = useState(false)
  const [direction, setDirection] = useState(90)

  useEffect(() => {
    headRelations()
  }, [])

  const headRelations = () => {
    apiClient.get('organization-overview/master').then(({ data }) => {
      if (data?.result) {
        const nodeDataArray = data.result.orgData
        const linkDataArray = data.result.orgDataLink

        setState({ nodeDataArray, linkDataArray })
        setShow(true)
      }
    })
  }

  const textStyle = { font: '6pt  Segoe UI,sans-serif', stroke: 'black' }

  const findHeadShot = () =>
    'data:image/png;base64,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'

  const initDiagram = () => {
    const $ = go.GraphObject.make

    const diagram = $(go.Diagram, {
      layout: $(go.LayeredDigraphLayout, {
        direction,
        layerSpacing: 20,
        alignOption: go.LayeredDigraphLayout.AlignAll
      }),
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      initialScale: 0.7,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key' // this should always be set when using a GraphLinksModel
      })
    })

    diagram.linkTemplate = $(
      go.Link,
      go.Link.Orthogonal,
      { corner: 5, relinkableFrom: true, relinkableTo: true },
      $(go.Shape, { strokeWidth: 2, stroke: '#d3d3d3' })
    )
    $(go.Overview, 'orgOverview', {
      observed: diagram,
      contentAlignment: go.Spot.Center
    })

    diagram.nodeTemplate = $(
      go.Node,
      'Auto', // the Shape will go around the TextBlock
      $(go.Shape, new go.Binding('figure', 'fig'), new go.Binding('fill', 'color'), {
        strokeWidth: 0,
        fill: '#fff'
      }),

      $(
        go.Panel,
        'Vertical',
        $(
          go.Shape,
          'MinusLine',
          { width: 300, height: 1, strokeWidth: 3, stroke: '#ffaa8e' },
          new go.Binding('stroke', 'topLineColor').makeTwoWay()
        ),

        $(
          go.Panel,
          'Spot',
          { scale: 1.5 },
          $(go.Shape, 'Circle', { width: 50, strokeWidth: 0, fill: '#fff' }),
          $(
            go.Panel,
            'Spot',
            { isClipping: true },
            $(go.Shape, 'Circle', { width: 40 }),
            $(
              go.Picture,
              {
                name: 'Picture',
                desiredSize: new go.Size(45, 45),
                margin: new go.Margin(0, 8, 0, 8),
                cursor: 'pointer',
                source: findHeadShot()

                // click: (e, obj) => {
                //   this.onSelectEmployee(obj)
                // }
              },
              new go.Binding('source', 'profile_picture', findHeadShot)
            )
          )
        ),

        $(
          go.TextBlock,
          textStyle,
          {
            row: 1,
            column: 0,
            font: '16pt Segoe UI,sans-serif',
            alignment: go.Spot.Center,
            margin: 5
          },
          new go.Binding('text', 'name').makeTwoWay()
        ),
        $(
          go.TextBlock,
          textStyle, // the name
          {
            row: 4,
            column: 0,
            font: '12pt Segoe UI,sans-serif',
            stroke: 'gray',
            alignment: go.Spot.Center,
            margin: 5
          },
          new go.Binding('text', 'type').makeTwoWay()
        )
      )
      // {
      //   doubleClick(e, node) {
      //     history(`/app/assets/${node.ub.key}/Diagram`)
      //   }
      // }
    )

    return diagram
  }

  const onChangeDirection = (e) => {
    setShow(false)
    setTimeout(() => {
      setDirection(e.target.value)
      setShow(true)
    }, 500)
  }

  return (
    <>
      {/* <h4 className="mb-2" /> */}
      <Row justify="center">
        <Col lg={22}>
          <TableLayout
            title="Organization Overview"
            rightSection={
              <div>
                <Radio.Group onChange={onChangeDirection} value={direction} defaultValue={direction}>
                  <Radio.Button value={0}>
                    <ArrowRightOutlined />
                  </Radio.Button>
                  <Radio.Button value={90}>
                    <ArrowDownOutlined />
                  </Radio.Button>
                  <Radio.Button value={180}>
                    <ArrowLeftOutlined />
                  </Radio.Button>
                  <Radio.Button value={270}>
                    <ArrowUpOutlined />
                  </Radio.Button>
                </Radio.Group>
              </div>
            }>
            {show && (
              <div className="asset-diagram card">
                <div id="orgOverview" />
                <ReactDiagram
                  // ref={this.diagramRef}
                  divClassName="diagram-component"
                  style={{ backgroundColor: '#eee' }}
                  initDiagram={initDiagram}
                  nodeDataArray={state.nodeDataArray}
                  linkDataArray={state.linkDataArray}
                  // modelData={this.props.modelData}
                  // onModelChange={this.props.onModelChange}
                  // skipsDiagramUpdate={this.props.skipsDiagramUpdate}
                />
              </div>
            )}
          </TableLayout>
        </Col>
      </Row>
    </>
  )
}
