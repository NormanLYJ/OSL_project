
// Unique constant
CREATE CONSTRAINT ON (e:Entity) assert e.name IS UNIQUE;
CREATE CONSTRAINT ON (e:Entity) assert e.id IS UNIQUE;
CREATE CONSTRAINT ON (o:Officer) assert o.name IS UNIQUE;
CREATE CONSTRAINT ON (o:Officer) assert o.id IS UNIQUE;
CREATE CONSTRAINT ON (a:Address) assert a.name IS UNIQUE;
CREATE CONSTRAINT ON (a:Address) assert a.id IS UNIQUE;
CREATE CONSTRAINT ON (i:Intermediary) assert i.name IS UNIQUE;
CREATE CONSTRAINT ON (i:Intermediary) assert i.id IS UNIQUE;