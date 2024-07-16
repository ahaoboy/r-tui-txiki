const encoder = new TextEncoder();
const decoder = new TextDecoder()

const write = (s: string) => tjs.stdout.write(encoder.encode(s));
const stdout = {
  rows: tjs.stdout.height,
  columns: tjs.stdout.width,
  write,
}

export function spawn(exe: string, args: string[]) {
  const proc = tjs.spawn([exe, ...args], {
    stdin: 'pipe',
    stdout: 'pipe'
  })
  return {
    stdout: {
      async on(name: string, cb: (s: string) => void) {
        if (name === 'data') {
          const data = new Uint8Array(4096)
          const n = await proc.stdout?.read(data)
          if (!n) {
            return
          }
          const s = decoder.decode(data.slice(0, n))
          cb(s)
          return s
        }
        throw new Error("not support yet!")
      }
    }
  }
}

const stdin = {
  async addListener(name: string, cb: Function) {
    if (name === 'data') {
      while (true) {
        const buf = new Uint8Array(4096);
        const nread = await tjs.stdin.read(buf);
        console.log("buf: ", nread,)
        if (nread) {
          cb(new TextDecoder().decode(buf.subarray(0, nread)))
        } else {
          throw new Error("stdin read error")
        }
      }
    }
    throw new Error(`not support event: ${name}`)
  }
}

// @ts-ignore
globalThis.process = {
  stdout, stdin
}