const isTokenSet = () => {
    if (localStorage.getItem("token") !== null) return true
    else return false
}

export { isTokenSet };