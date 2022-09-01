import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { githubActions } from "../redux/slices/github.slice"
import { store } from "../store"

const actions = {
	...githubActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch