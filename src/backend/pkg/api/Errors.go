package api 


type _Error struct {
	msg string `json:"msg"`
}

func Error(msg string) _Error{
	return(_Error{msg})
}