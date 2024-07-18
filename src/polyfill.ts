const encoder = new TextEncoder();
const decoder = new TextDecoder()

const write = async (s: string) => await tjs.stdout.write(encoder.encode(s));
const stdout = {
  rows: tjs.stdout.height,
  columns: tjs.stdout.width,
  write,
}
const data = new Uint8Array(4096)

export function spawn(exe: string, args: string[]) {
  const proc = tjs.spawn([exe, ...args], {
    stdin: 'pipe',
    stdout: 'pipe'
  })
  return {
    stdout: {
      async on(name: string, cb: (s: string) => void) {
        if (name === 'data') {
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


let buf: null | string = ''

const EscapeMap: Record<string, string> = {
  '\x1b[A': "UP",
  '\x1b[B': "DOWN",
  '\x1b[C': "RIGHT",
  '\x1b[D': "LEFT",
}

async function readToString(): Promise<string> {
  const nread = await tjs.stdin.read(data);
  if (!nread) {
    return ''
  }
  const s = decoder.decode(data.subarray(0, nread))
  if (EscapeMap[s]) return EscapeMap[s]
  return s
}

const stdin = {
  setRawMode(mode: boolean) {
    tjs.stdin.setRawMode(mode)
  },
  read(): string | null {
    if (buf?.length) {
      const s = buf
      buf = null
      return s
    }
    return null
  },
  async addListener(name: string, cb: (s: string) => void) {
    if (name === 'data') {
      while (true) {
        cb(await readToString())
      }
    }

    if (name === 'readable') {
      while (true) {
        const s = await readToString()
        buf = s;
        cb(s)
      }
    }
    throw new Error(`not support event: ${name}`)
  }
}

// @ts-ignore
globalThis.process = {
  stdout,
  stdin,
  exit: tjs.exit
}