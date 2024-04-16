import eel

eel.init("web", allowed_extensions=['.js', '.html'])
eel.start("index.html", size=(380, 540))