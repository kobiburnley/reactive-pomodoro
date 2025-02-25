
export const styles = `
body {
    font-family: 'Open Sans', sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
}

#container {
    display: flex;
    padding: 10px;
    border-radius: 4px;
    flex-direction: column;
    justify-content: space-around;
    background: linear-gradient(#fcc853, #F2F1E8);
    width: 200px;
    height: 300px;
}

#container nav {
    display: flex;
    justify-content: flex-end;
}

.fa-cog {
    cursor: pointer;
    color: #012D35;
}

#container #duration-selector {
    height: 100px;
    width: 200px;
    position: absolute;
    background-color: #0C6572;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    color: #012D35;
    border-radius: 2px;
    box-shadow: 1px 1px 4px 0px #ccc;
}

#duration-selector button {
    border: none;
    font-size: 20px;
    background-color: #fcc853;
    color: #012D35;
    border-radius: 1px;
}

#duration-selector div {
    display: flex;
    justify-content: space-around;
}
#duration-selector input {
    width: 40%;
    border: none;
    box-sizing: border-box;
    padding: 0 4px;
    background: #F2F1E8;
    border-radius: 1px;
}

input[type=number] {
    -moz-appearance:textfield;
}

#container header {
    display: flex;
    justify-content: center;
}

#container header h1 {
    font-size: 68px;
    color: #0C6572
}

#container #buttons {
    display: flex;
    justify-content: space-around;
}

#buttons button {
    height: 54px;
    width: 54px;
    border-radius: 4px;
    font-size: 36px;
    border: none;
    text-align: center;
    background-color: #fcc853;
    /* background-color: #c7a59b; */
    color: #012D35;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 4px 0px #ccc;
    cursor: pointer;
}

/*#e4d6bb*/

/*dark: #235c78
buttons: #fe4c47
container: #ebd7c5*/
`
