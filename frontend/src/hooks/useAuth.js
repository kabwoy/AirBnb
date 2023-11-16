const useAuth = () => {
    const userDetails = JSON.parse(localStorage.getItem('user')) ?? null;

    if(!userDetails) return null

    return userDetails;
}

export default useAuth