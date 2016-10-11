import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

class Landing extends React.Component {
  render () {
    return (
      <div>
        <Card>
          <CardHeader
            title="Hello"
          />
          <CardText>
            "Hello"
          </CardText>
        </Card>
        <Card>
          <CardHeader
            title="Hello"
          />
          <CardText>
            "Hello"
          </CardText>
        </Card>
      </div>
    )
  }
}

Landing.defaultProps = {
}

export default Landing
