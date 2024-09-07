Search.setIndex({"docnames": ["README", "SQL/index", "SQL/review", "SQL/strings", "SQL/truncation", "SQL_hidden/Subqueries", "SQL_hidden/Views", "SQL_hidden/Views_CTEs", "overview", "relational_algebra/extended", "relational_algebra/index", "relational_algebra/primitives"], "filenames": ["README.md", "SQL/index.md", "SQL/review.md", "SQL/strings.md", "SQL/truncation.md", "SQL_hidden/Subqueries.md", "SQL_hidden/Views.md", "SQL_hidden/Views_CTEs.md", "overview.md", "relational_algebra/extended.md", "relational_algebra/index.md", "relational_algebra/primitives.md"], "titles": ["Data 101 Course Notes", "<span class=\"section-number\">1. </span>SQL", "<span class=\"section-number\">1.1. </span>SQL Review", "<span class=\"section-number\">1.2. </span>String Manipulation", "<span class=\"section-number\">1.3. </span>Truncating Relations", "Subqueries", "Views", "Virtual View, CTE, Materialized View", "Overview", "<span class=\"section-number\">2.2. </span>Extended RA Operators", "<span class=\"section-number\">2. </span>Relational Algebra", "<span class=\"section-number\">2.1. </span>Relational Algebra Overview"], "terms": {"thi": [0, 2, 3, 4, 5, 6, 7, 8, 9, 11], "repositori": [0, 8], "contain": [0, 2, 3, 8, 11], "resourc": 0, "see": [0, 2, 3], "doc": [0, 2, 3], "repo": 0, "org": [0, 11], "more": [0, 2, 3, 4, 5, 7, 9, 11], "info": 0, "how": [0, 2], "compil": 0, "etc": [0, 2, 3, 11], "A": [1, 2, 5, 9, 11], "gener": [1, 2, 3, 4, 11], "overview": [1, 10], "postgresql": [1, 2, 3], "flavor": [1, 2], "review": [1, 8], "string": [1, 2, 8], "manipul": [1, 8, 9], "truncat": [1, 8], "relat": [1, 5, 7], "last": [2, 3, 4, 5, 6, 7, 9, 11], "updat": [2, 3, 4, 5, 6, 7, 8, 9, 11], "august": [2, 4, 5, 6, 7], "27": [2, 4, 5, 6, 7], "2024": [2, 3, 4, 5, 6, 7, 9, 11], "i": [2, 3, 4, 5, 7, 8, 9, 11], "100": 2, "syntax": [2, 3, 11], "plu": 2, "In": [2, 5, 7, 8, 11], "cours": 2, "we": [2, 4, 5, 6, 7, 8, 9, 11], "ll": [2, 11], "cover": [2, 9], "three": [2, 11], "type": [2, 11], "system": [2, 4, 9, 11], "datafram": 2, "databas": [2, 11], "spark": 2, "note": [2, 5, 8, 9, 11], "focu": 2, "languag": 2, "us": [2, 3, 5, 8, 9, 11], "interact": 2, "structur": [2, 4, 8], "pronounc": 2, "sequel": 2, "high": 2, "level": [2, 4], "transform": 2, "support": [2, 11], "other": [2, 8, 9, 11], "like": [2, 4, 7], "It": [2, 11], "declar": 2, "rather": 2, "than": [2, 4, 7, 11], "imper": 2, "mean": [2, 3, 8, 11], "describ": 2, "what": [2, 7, 8], "": [2, 5, 9, 11], "centric": 2, "code": 2, "dialect": 2, "call": 2, "shorten": 2, "postgr": [2, 3], "post": 2, "gress": 2, "also": [2, 3, 4, 5, 7, 11], "eponym": 2, "free": 2, "open": 2, "sourc": [2, 3], "manag": [2, 11], "dbm": 2, "compliant": 2, "discuss": [2, 4, 11], "dbmse": 2, "thoroughli": 2, "throughout": 2, "you": [2, 3, 4, 7, 8, 9, 11], "had": [2, 9], "some": [2, 3, 11], "experi": [2, 4], "perhap": 2, "duckdb": 2, "sqlite": 2, "therefor": [2, 3, 4, 11], "start": [2, 3, 4], "quick": 2, "refresh": [2, 3], "make": 2, "easi": 2, "refer": [2, 8], "rest": 2, "follow": [2, 3, 5, 6, 7, 9, 11], "conceptu": 2, "explan": 2, "detail": 2, "As": [2, 11], "statement": [2, 5, 6], "ar": [2, 3, 4, 5, 7, 8, 9, 11], "evalu": 2, "left": [2, 11], "right": [2, 11], "top": [2, 4], "bottom": 2, "instead": [2, 5, 7], "each": [2, 11], "meant": [2, 8], "read": 2, "english": 2, "howev": 2, "certain": 2, "befor": [2, 4], "5": [2, 3], "r1": [2, 9], "r2": [2, 9], "1": [2, 3, 4, 11], "c1": 2, "2": [2, 3], "BY": [2, 3, 4, 9], "a1": [2, 9], "a2": [2, 9], "3": [2, 4], "c2": 2, "4": 2, "fetch": 2, "tabl": [2, 3, 4, 6, 11], "comput": [2, 3, 4, 7, 9], "cross": [2, 9, 11], "product": [2, 9], "For": [2, 3, 4, 5, 6, 9, 11], "tupl": [2, 4, 5, 9, 11], "keep": [2, 7, 11], "onli": [2, 4, 5, 7, 11], "those": [2, 11], "satisfi": [2, 11], "condit": [2, 11], "creat": [2, 6, 7, 11], "At": [2, 11], "time": [2, 7, 9, 11], "all": [2, 3, 4, 5, 11], "need": 2, "below": [2, 3, 8, 11], "check": [2, 11], "add": [2, 7, 11], "output": [2, 4, 7, 9, 11], "base": [2, 4, 6, 7], "attribut": [2, 5, 9, 11], "set": [2, 5], "row": [2, 4, 11], "filter": [2, 11], "happen": [2, 5], "made": 2, "wherea": [2, 8], "after": [2, 6], "By": [2, 9], "convent": [2, 9], "cap": [2, 11], "e": [2, 3, 5, 6, 7, 9, 11], "g": [2, 3, 6, 9, 11], "while": [2, 4, 9, 11], "lowercas": 2, "end": 2, "semicolon": 2, "let": 2, "terminologi": 2, "drawn": 2, "primari": [2, 11], "abstract": 2, "landscap": 2, "collect": [2, 5, 11], "predefin": 2, "ha": [2, 11], "domain": [2, 11], "which": [2, 3, 5, 11], "must": [2, 4, 7, 11], "atom": 2, "integ": 2, "doe": [2, 3, 11], "matter": 2, "algebra": 2, "theoret": [2, 11], "foundat": [2, 11], "assum": [2, 11], "allow": 2, "duplic": [2, 11], "guarante": 2, "store": [2, 7], "particular": [2, 4, 8], "schema": [2, 9, 11], "name": [2, 3, 11], "associ": [2, 11], "often": [2, 3], "includ": [2, 9, 11], "itself": 2, "exist": [2, 11], "imdb": 2, "dataset": [2, 4], "titl": [2, 11], "title_id": 2, "region": 2, "an": [2, 5, 7, 8, 9, 11], "instanc": 2, "specif": [2, 3, 9, 11], "instanti": 2, "valu": [2, 3, 5, 9, 11], "word": [2, 8, 11], "less": 2, "defin": [2, 5, 7, 11], "here": [2, 3, 4, 11], "draw": 2, "attent": 2, "idea": 2, "could": [2, 5, 9, 11], "hold": 2, "differ": [2, 9], "over": [2, 8], "think": [2, 7], "whose": 2, "column": [2, 3], "organ": 2, "accord": 2, "hear": 2, "interchang": 2, "though": [2, 9], "former": [2, 11], "when": [2, 3, 4, 5], "simpl": 2, "most": [2, 11], "standard": [2, 3], "extract": [2, 3], "record": [2, 6], "about": [2, 4, 7], "rememb": 2, "first": [2, 3, 4, 9, 11], "line": 2, "so": [2, 4, 7, 9], "match": [2, 3, 11], "specifi": [2, 11], "can": [2, 3, 4, 5, 6, 7, 8, 9, 11], "emploi": 2, "renam": 2, "mani": [2, 3, 8, 9, 11], "function": [2, 9], "date": 2, "either": [2, 11], "separ": 2, "comma": 2, "impli": 2, "join": [2, 5, 9], "involv": [2, 11], "section": [2, 3, 4], "logic": [2, 11], "oper": [2, 4, 8, 10], "AND": [2, 5, 11], "OR": [2, 11], "NOT": [2, 5, 11], "comparison": [2, 11], "equival": [2, 11], "document": 2, "9": [2, 3], "do": [2, 5, 11], "necessarili": 2, "thei": [2, 7], "should": 2, "discover": 2, "alias": 2, "identifi": 2, "scalar": 2, "subqueri": 2, "much": 2, "provid": [2, 11], "return": [2, 3, 4, 5], "singl": [2, 3, 5], "subsequ": 2, "treat": [2, 5], "larger": [2, 5, 7], "To": [2, 3, 7, 9], "find": [2, 3, 5], "id": [2, 5], "stop": [2, 4, 5, 6, 7], "oldest": 2, "individu": 2, "s1": [2, 5], "ag": [2, 4], "max": [2, 3], "s2": [2, 5], "alia": 2, "second": 2, "sum": [2, 11], "min": 2, "avg": 2, "count": [2, 3], "abov": [2, 5, 9, 11], "minimum": 2, "maximum": 2, "unnam": [2, 11], "two": [2, 3, 11], "numer": 2, "32": 2, "25": 2, "precis": [2, 9], "vari": 2, "mai": [2, 4, 7, 9, 11], "atribut": 2, "special": [2, 11], "number": [2, 3, 8, 11], "even": 2, "total": [2, 11], "non": 2, "averag": 2, "remov": [2, 3, 9, 11], "prior": 2, "consid": 2, "locat": [2, 5], "want": [2, 4, 5, 6, 7], "oppos": 2, "overal": 2, "sai": [2, 4], "avgag": 2, "minag": 2, "notabl": 2, "element": 2, "becaus": [2, 4, 7, 11], "being": [2, 5], "wai": 2, "squish": 2, "down": [2, 7], "per": 2, "ignor": 2, "statist": 2, "deviat": 2, "covari": 2, "regress": 2, "slope": 2, "intercept": 2, "correl": 2, "coeffici": 2, "median": 2, "peopl": [2, 3, 11], "zip": [2, 5], "percentage_disc": 2, "0": 2, "within": 2, "sophist": 2, "BYs": 2, "across": [2, 11], "variou": [2, 5], "dai": 2, "west": 2, "oakland": 2, "rockridg": 2, "THEN": 2, "els": 2, "west_oakland_avg": 2, "rockridge_avg": 2, "suppos": [2, 5, 6, 7, 9, 11], "typic": [2, 7], "preced": 2, "appli": 2, "elimin": 2, "least": [2, 4], "30": 2, "similarli": 2, "mention": 2, "part": [2, 7], "wildcard": 2, "charact": [2, 3], "place": [2, 5], "ani": [2, 3, 7], "explicit": 2, "paramet": [2, 3], "effect": 2, "get": [2, 6], "pass": [2, 3], "onto": 2, "denot": [2, 3, 11], "serv": 2, "sever": [2, 11], "purpos": 2, "respect": [2, 11], "aka_titl": 2, "t": [2, 11], "orig_titl": 2, "aka": 2, "syntact": 2, "shortcut": 2, "sometim": [2, 4, 7], "omit": 2, "mozilla": 2, "style": 2, "guid": 2, "best": 2, "practic": [2, 9], "prefer": [2, 11], "depend": [2, 11], "complet": 2, "hide": 2, "actual": 2, "until": 2, "offici": 2, "command": [2, 6], "search": 2, "convert": 2, "one": [2, 3, 5, 9, 11], "anoth": [2, 5, 6], "runtime_minut": 2, "were": [2, 8], "runtime_hour": 2, "reason": 2, "premier": 2, "wa": [2, 11], "interpret": 2, "year": [2, 8], "primary_titl": 2, "release_year": 2, "doubl": 2, "60": 2, "15": [2, 4], "miss": 2, "inapplic": 2, "current": 2, "unknown": 2, "take": [2, 4, 11], "perform": [2, 11], "boolean": [2, 11], "born": [2, 11], "2023": 2, "both": [2, 3, 11], "fals": 2, "lead": 2, "unintuit": 2, "behavior": 2, "don": 2, "If": [2, 3, 5, 11], "explicitli": 2, "test": 2, "exclud": 2, "enabl": 2, "18": 2, "inform": [2, 11], "result": [2, 4, 5, 6, 9], "uniqu": [2, 5], "subset": [2, 4, 9, 11], "septemb": [3, 9, 11], "7": 3, "depth": 3, "descript": 3, "The": [3, 4, 7, 8, 9, 11], "keyword": [3, 5, 11], "where": [3, 5, 6, 7, 8, 9, 11], "claus": [3, 5], "between": 3, "given": 3, "pattern": 3, "substitut": 3, "zero": 3, "_": 3, "percent": 3, "sign": 3, "underscor": 3, "exact": 3, "There": [3, 4], "substr": 3, "strpo": 3, "posit": [3, 4], "concaten": 3, "exampl": [3, 4, 5, 6], "from": [3, 4, 5, 6, 7, 9, 11], "unlik": [3, 7], "python": [3, 11], "sql": [3, 5, 6, 7, 11], "index": 3, "hello": 3, "world": 3, "ell": 3, "handl": 3, "posix": 3, "regular": [3, 7], "express": [3, 5, 9, 11], "replac": 3, "flag": 3, "option": [3, 4, 11], "process": 3, "postgressql": 3, "24": 3, "full": [3, 4, 11], "list": [3, 9, 11], "captur": 3, "group": [3, 4], "parenthes": [3, 5], "subpattern": 3, "hannah": 3, "montana": 3, "phone": 3, "510": 3, "642": 3, "3214": 3, "za": 3, "z": 3, "hone": 3, "alphanumer": 3, "space": 3, "5106423214": 3, "queri": [3, 4, 5, 6, 7, 11], "select": [3, 4, 5, 6, 7, 9], "lastnam": 3, "firstnam": 3, "countnam": 3, "order": [3, 4, 8, 9], "desc": [3, 4], "length": 3, "longest": 3, "WITH": [3, 5, 7], "AS": [3, 5, 6, 7, 11], "just": [4, 7], "portion": 4, "few": [4, 9], "via": 4, "val": 4, "descend": 4, "point": 4, "11": 4, "09": 4, "02": 4, "your": [4, 9], "conveni": [4, 7], "lectur": [4, 8], "project": 4, "expect": 4, "know": 4, "learn": 4, "tablesampl": 4, "around": 4, "07": 4, "onc": [4, 7], "memori": 4, "desir": 4, "origin": [4, 11], "might": [4, 7], "too": 4, "larg": [4, 11], "quickli": 4, "run": [4, 6, 7], "method": [4, 7], "class": 4, "random": 4, "n": [4, 11], "randomli": 4, "sort": [4, 9], "bernoulli": 4, "percentag": 4, "p": 4, "uniform": 4, "flip": [4, 7], "probabl": 4, "coin": 4, "page": 4, "disk": 4, "uniformli": 4, "expens": 4, "faster": [4, 11], "slower": 4, "due": 4, "access": [4, 5], "fastest": 4, "same": [5, 11], "123": 5, "issu": [5, 7], "parethes": 5, "race": 5, "import": 5, "relev": 5, "variabl": [5, 7, 11], "clear": 5, "rewrit": 5, "cte": 5, "location123": 5, "form": [5, 11], "determin": [5, 11], "zipcod": 5, "stopzip": 5, "natur": [5, 11], "sz1": 5, "sz2": 5, "have": [5, 6, 8, 9, 11], "entri": 5, "act": 6, "new": 6, "turn": [6, 9], "citationstop": [6, 7], "gender": [6, 7], "citat": [6, 7], "true": [6, 7], "now": [6, 9], "directli": [6, 11], "But": [6, 7], "chang": [6, 7, 9, 11], "recreat": [6, 7], "reflect": 6, "avoid": 7, "manual": 7, "deriv": 7, "known": 7, "user": 7, "demand": 7, "break": 7, "inlin": 7, "lifetim": 7, "restrict": [7, 11], "On": 7, "side": 7, "lot": 7, "naiv": 7, "slow": 7, "everi": [7, 11], "solv": 7, "automat": 7, "sinc": 7, "remateri": 7, "frequent": 7, "unnecessari": 7, "overhead": 7, "data": [7, 8, 9, 11], "engin": [7, 8], "thought": 7, "progress": 8, "101": 8, "uc": 8, "berkelei": 8, "homepag": 8, "semi": 8, "weekli": 8, "addit": 8, "core": 8, "concept": 8, "activ": 8, "demo": 8, "intern": 8, "chapter": [8, 11], "bundl": 8, "topic": 8, "appear": 8, "out": [8, 11], "compar": [8, 11], "present": 8, "try": 8, "indic": 8, "possibl": 8, "navig": 8, "sidebar": 8, "link": 8, "extend": [8, 10, 11], "ra": [8, 10], "been": 8, "design": 8, "develop": [8, 11], "thank": 8, "dedic": 8, "faculti": 8, "instructor": 8, "valuabl": 8, "essenti": 8, "instruct": 8, "contributor": 8, "alphabet": 8, "joe": 8, "hellerstein": 8, "lakshya": 8, "jain": 8, "aditya": 8, "parameswaran": 8, "lisa": 8, "yan": 8, "semest": 8, "teach": 8, "assist": 8, "6": [9, 11], "six": [9, 11], "primit": 9, "compos": 9, "notic": 9, "veri": 9, "them": 9, "themselv": 9, "beyond": 9, "ad": [9, 11], "encompass": 9, "outer": 9, "null": 9, "aggreg": [], "briefli": 11, "touch": 11, "model": 11, "introduc": 11, "basic": 11, "format": 11, "revisit": 11, "formal": [9, 11], "mathemat": 11, "theori": 11, "formula": 11, "therebi": 11, "properti": 11, "elementari": 11, "arithmet": 11, "linear": 11, "vector": 11, "matric": 11, "popular": 11, "edgar": 11, "f": 11, "codd": 11, "1970": 11, "work": 11, "basi": 11, "concurr": 11, "rdbmse": 11, "context": 11, "unord": 11, "conclus": 11, "our": 11, "bag": [], "why": 11, "upon": 11, "complex": 11, "These": 11, "operand": 11, "input": [9, 11], "produc": 11, "r": [9, 11], "b_1": [9, 11], "dot": [9, 11], "b_m": 11, "pi_": [9, 11], "a_1": [9, 11], "a_2": 11, "a_n": [9, 11], "leq": 11, "m": 11, "sigma_c": [9, 11], "c": [9, 11], "wedg": 11, "vee": 11, "share": 11, "rho_": 11, "a_m": 11, "b_": 11, "i_1": 11, "rightarrow": 11, "i_n": 11, "stai": 11, "consist": 11, "notat": [9, 11], "unchang": 11, "latter": 11, "i_j": 11, "a_": 11, "j": 11, "term": 11, "sfw": 11, "map": 11, "_id": 11, "_titl": 11, "runtim": 11, "_minut": 11, "person": 11, "di": 11, "drop": 11, "sigma_": 11, "1980": 11, "birth": 11, "death": 11, "person_id": 11, "previou": 11, "concis": 11, "next": 11, "remain": 11, "r_1": 11, "r_2": 11, "b_2": 11, "a_i": 11, "b_j": 11, "n_1": 11, "n_2": 11, "cup": 11, "distinct": 11, "empti": 11, "ve": 11, "intersect": 11, "composit": 11, "leav": [9, 11], "exercis": 11, "case": 11, "definit": [9, 11], "theta": 11, "bowtie_": 11, "distinguish": 11, "common": 11, "equi": 11, "equal": 11, "bowti": 11, "pair": 11, "its": 11, "back": 11, "easier": 11, "illustr": 11, "crew": 11, "tid": 11, "pid": 11, "b": 11, "d": 11, "would": 11, "bigl": [9, 11], "bigr": [9, 11], "reduc": 11, "Then": 11, "bank": 11, "commun": 11, "acm": 11, "13": 11, "377": 11, "387": 11, "june": 11, "http": 11, "doi": 11, "10": 11, "1145": 11, "362384": 11, "362685": 11, "gamma": 9, "c_1": 9, "c_n": 9, "b_n": 9, "agg_1": 9, "agg_k": 9, "written": 9, "gamma_": 9, "repres": [], "come": 9, "ye": 9, "unwieldi": 9, "good": 9, "write": 9, "sigma_h": 9, "b1": 9, "bm": 9, "agg1": 9, "d1": 9, "aggp": 9, "dk": 9, "rk": 9, "biggl": 9, "biggr": 9, "execut": 9, "dp": 9, "agg2": 9, "d2": 9, "b2": 9, "h": 9, "avail": 9, "wikipedia": 9, "slightli": 9, "homework": 9, "util": 11, "panda": 11, "implement": 11, "realiti": 11, "multipl": 11, "copi": 11, "further": 11, "meaning": 11, "brief": 11, "occurr": 11, "comment": 11, "preserv": 11, "roughli": 11, "fast": 11, "step": 11, "subtract": 11}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"data": [0, 2], "101": 0, "cours": [0, 8], "note": 0, "sql": [1, 2, 8, 9], "review": 2, "queri": [2, 9], "order": 2, "execut": 2, "The": 2, "relat": [2, 4, 8, 9, 10, 11], "model": 2, "select": [2, 11], "from": 2, "where": 2, "sfw": 2, "list": 2, "express": [2, 7], "claus": 2, "aggreg": [2, 9], "exampl": [2, 11], "group": [2, 9], "have": 2, "symbol": 2, "addit": 2, "keyword": 2, "asterisk": 2, "AS": 2, "cast": 2, "null": 2, "case": 2, "distinct": 2, "string": 3, "manipul": 3, "like": 3, "NOT": 3, "advanc": 3, "function": 3, "regexp_replac": 3, "truncat": 4, "limit": 4, "offset": 4, "sampl": 4, "subqueri": 5, "scalar": 5, "exist": 5, "view": [6, 7], "virtual": 7, "cte": 7, "materi": 7, "common": 7, "tabl": [7, 8], "overview": [8, 11], "content": 8, "algebra": [8, 9, 10, 11], "acknowledg": 8, "extend": 9, "ra": [9, 11], "oper": [9, 11], "set": 11, "primit": 11, "unari": 11, "project": 11, "renam": 11, "binari": 11, "cartesian": 11, "product": 11, "union": 11, "differ": 11, "deriv": 11, "join": 11, "refer": 11, "bag": 11}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 8, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinxcontrib.bibtex": 9, "sphinx": 57}, "alltitles": {"Data 101 Course Notes": [[0, "data-101-course-notes"]], "SQL": [[1, "sql"], [8, null]], "SQL Review": [[2, "sql-review"]], "SQL Query Order of Execution": [[2, "sql-query-order-of-execution"]], "The Relational Data Model": [[2, "the-relational-data-model"]], "SELECT-FROM-WHERE (SFW)": [[2, "select-from-where-sfw"]], "SELECT list of expressions": [[2, "select-list-of-expressions"]], "FROM clause": [[2, "from-clause"]], "WHERE clause": [[2, "where-clause"]], "Aggregations": [[2, "aggregations"]], "Aggregation Examples": [[2, "aggregation-examples"]], "Grouping": [[2, "grouping"]], "HAVING": [[2, "having"]], "Symbols and Additional Keywords": [[2, "symbols-and-additional-keywords"]], "The asterisk (*)": [[2, "the-asterisk"]], "AS": [[2, "as"]], "CAST": [[2, "cast"]], "NULL": [[2, "null"]], "CASE": [[2, "case"]], "DISTINCT": [[2, "distinct"]], "String Manipulation": [[3, "string-manipulation"]], "LIKE, NOT LIKE": [[3, "like-not-like"]], "Advanced string functionality": [[3, "advanced-string-functionality"]], "REGEXP_REPLACE": [[3, "regexp-replace"]], "Truncating Relations": [[4, "truncating-relations"]], "LIMIT and OFFSET": [[4, "limit-and-offset"]], "Sampling": [[4, "sampling"]], "Subqueries": [[5, "subqueries"]], "Scalar Subqueries": [[5, "scalar-subqueries"]], "EXISTS": [[5, "exists"]], "Views": [[6, "views"]], "Virtual View, CTE, Materialized View": [[7, "virtual-view-cte-materialized-view"]], "Virtual View": [[7, "virtual-view"]], "Common Table Expression (CTE)": [[7, "common-table-expression-cte"]], "Materialized View": [[7, "materialized-view"]], "Overview": [[8, "overview"]], "Table of Contents": [[8, "table-of-contents"]], "Relational Algebra": [[8, null], [10, "relational-algebra"]], "Course Acknowledgments": [[8, "course-acknowledgments"]], "Extended RA Operators": [[9, "extended-ra-operators"]], "Grouping and Aggregation": [[9, "grouping-and-aggregation"]], "SQL query to Relational Algebra": [[9, "sql-query-to-relational-algebra"]], "Relational Algebra Overview": [[11, "relational-algebra-overview"]], "Set Relational Algebra": [[11, "set-relational-algebra"]], "Primitive RA Operations": [[11, "primitive-ra-operations"]], "Unary Operators: Projection, Selection, Renaming": [[11, "unary-operators-projection-selection-renaming"]], "Examples": [[11, "examples"]], "Binary Operators: Cartesian Product, Union, and Difference": [[11, "binary-operators-cartesian-product-union-and-difference"]], "Derived Operations": [[11, "derived-operations"]], "Joins": [[11, "joins"]], "Bag Relational Algebra": [[11, "bag-relational-algebra"]], "References": [[11, "references"]]}, "indexentries": {}})