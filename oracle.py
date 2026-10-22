import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def boards(n, l, s):
    per = s//l; k = -(-n//per)
    return f"The {pl(n,' shelf',' shelves')} of {l} inches from {s} inch boards take {pl(k,' board',' boards')}, {pl(per,' shelf',' shelves')} from each board, leaving {k*s-n*l} inches."
def brackets(n, l, g):
    per = -(-l//g) + 1
    return f"The {pl(n,' shelf',' shelves')} of {l} inches with brackets {g} inches apart take {pl(per,' bracket',' brackets')} a shelf, {pl(n*per,' bracket',' brackets')} in all."
def screws(b, p, x):
    t = b*p; k = -(-t//x)
    return f"The {pl(b,' bracket',' brackets')} at {pl(p,' screw',' screws')} each take {pl(t,' screw',' screws')}, in boxes of {x} that is {pl(k,' box',' boxes')}, leaving {pl(k*x-t,' screw',' screws')}."
def cost(n, p, b, q):
    return f"The {pl(n,' board',' boards')} at ${dec(p)} and {pl(b,' bracket',' brackets')} at ${dec(q)} cost ${money(n*p+b*q)}, boards ${money(n*p)} and brackets ${money(b*q)}."
random.seed(763)
R=random.randint
cases = [
 dict(fn="boards", args=["4","30","96"], expect=boards(4,30,96)),
 dict(fn="brackets", args=["4","30","12"], expect=brackets(4,30,12)),
 dict(fn="screws", args=["16","4","25"], expect=screws(16,4,25)),
 dict(fn="cost", args=["2","14.50","16","2.35"], expect=cost(2,1450,16,235)),
 dict(fn="boards", args=["1","96","96"], expect=boards(1,96,96)),
 dict(fn="brackets", args=["1","1","1"], expect=brackets(1,1,1)),
]
for _ in range(25):
    s=R(1,1200); l=R(1,s); n=R(1,100000); cases.append(dict(fn="boards", args=[str(n),str(l),str(s)], expect=boards(n,l,s)))
for _ in range(25):
    n,l,g=R(1,100000),R(1,1200),R(1,1200); cases.append(dict(fn="brackets", args=[str(n),str(l),str(g)], expect=brackets(n,l,g)))
for _ in range(20):
    b,p,x=R(1,1000000),R(1,100),R(1,100000); cases.append(dict(fn="screws", args=[str(b),str(p),str(x)], expect=screws(b,p,x)))
for _ in range(20):
    n,p,b,q=R(1,100000),R(1,1000000),R(1,1000000),R(1,1000000); cases.append(dict(fn="cost", args=[str(n),dec(p),str(b),dec(q)], expect=cost(n,p,b,q)))
errs=[["boards",["0","30","96"]],["boards",["4","0","96"]],["boards",["4","30","0"]],["boards",["4","97","96"]],["boards",["4","30","1201"]],
 ["brackets",["0","30","12"]],["brackets",["4","1201","12"]],["brackets",["4","30","0"]],["brackets",["4","30","1201"]],
 ["screws",["0","4","25"]],["screws",["16","0","25"]],["screws",["16","101","25"]],["screws",["16","4","0"]],
 ["cost",["0","14.50","16","2.35"]],["cost",["2","0","16","2.35"]],["cost",["2","14.50","0","2.35"]],["cost",["2","14.50","16","0"]],["cost",["2","14.50","16","10000.01"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
