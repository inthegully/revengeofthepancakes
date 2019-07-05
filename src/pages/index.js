import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Layout from "../components/layout"

const Description = styled.h3`
  width: 90%;
  margin: 0, auto;
  @media (min-width: 768px) {
    font-size: 20px;
    width: 600px;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`

const Input = styled.input`
  border: 1px solid black;
  padding: 8px;
`
const Button = styled.button`
  margin-top: 25px;
  padding: 8px;
  width: 200px;
  background-color: #dcdcdc;
  color: black;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`

const IndexPage = () => {
  const [input, setInput] = useState([])
  const [stack, setStack] = useState([])
  const [output, setOutput] = useState([])

  let inputArray = []
  let flipsArray = []

  const pancakes = input.slice(1)
  const testCases = input[0]

  const pancakeFlipper = pancakes => {
    let flips = 0
    for (let i = 0; i < testCases; i++) {
      //handles pancake stacks that are all smile side up
      if (!pancakes[i].includes("-")) {
        flips = 0
        flipsArray.push("Case #" + (i + 1) + ": " + flips)
      } //handles pancake stacks that have a length of 1 and are blank side up
      else if (pancakes[i].length === 1) {
        flips = 1
        flipsArray.push("Case #" + (i + 1) + ": " + flips)
      } //handles pancake staks that have a blank pancake followed by all smile side up pancakes
      else if (
        pancakes[i].charAt(0) === "-" &&
        (pancakes[i].match(/\-/g) || []).length <= 1
      ) {
        flips = 1
        flipsArray.push("Case #" + (i + 1) + ": " + flips)
      } //handles all other stacks
      else {
        let flipCounter = 0
        while (pancakes[i].includes("-")) {
          //makes groups of similar characters
          const stack = pancakes[i].match(/(\W)(\1*)/g)

          //finds lengths of each group
          const stackLengths = stack.map(stack => stack.length)

          //finds the longest length
          const longestAt = stackLengths.indexOf(Math.max(...stackLengths))

          //slices array from longest length up
          const gettingFlipped = stackLengths.slice(0, longestAt + 1)

          //reducer to add values in array
          const add = (a, b) => a + b

          //adds number of characters from longest length up
          const whereToFlip = gettingFlipped.reduce(add)

          //splits pancakes into individual chracters in new array
          const newStack = pancakes[i].split("")

          //splices new array at end of longest group length up and then reverses
          const flipped = newStack.splice(0, whereToFlip).reverse()

          //switches symbols of flipped array to opposite
          const change = flipped.map(pancake => (pancake === "-" ? "+" : "-"))

          //adds flipped stack to the top of the rest of the unfilpped stack
          const flippedStack = change.concat(newStack).join("")
          flipCounter++
          pancakes[i] = flippedStack
        }
        flipsArray.push("Case #" + (i + 1) + ": " + flipCounter)
      }
    }
    return flipsArray
  }

  let pancakeInput = React.createRef()

  const handleSubmit = (event, pancakes) => {
    event.preventDefault()
    const pancakeStacks = pancakeInput.current.value.split(", ")
    setInput((inputArray = pancakeStacks))
    if (pancakeStacks.length) {
      pancakeInput.current.value = ""
    }
  }

  useEffect(
    input => {
      if (input) {
        setStack(stack)
      }
      pancakeFlipper(pancakes)
      setOutput(flipsArray)
    },
    [input]
  )

  return (
    <Layout>
      <Description>
        To enter a valid input, first enter the number of test cases followed by
        a comma, then that number of sets of pancake stacks to be flipped, each
        separated by a comma.
        <br />
        ie: 5, -, +, +-, -++, +-++-
      </Description>
      <Form>
        <Input type="text" name="input" ref={pancakeInput}></Input>
        <Button type="submit" onClick={event => handleSubmit(event, pancakes)}>
          Enter Input
        </Button>
      </Form>
      <Container>
        <div>
          <h4>Input</h4>
          {input.map((line, index) => {
            return <p key={index}>{line}</p>
          })}
        </div>
        <div>
          <h4>Output</h4>
          {output.map((flips, index) => {
            return <p key={index}>{flips}</p>
          })}
        </div>
      </Container>
    </Layout>
  )
}
export default IndexPage
